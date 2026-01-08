import { collection, addDoc, query, orderBy, limit, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "./config";

const LEADERBOARD_COLLECTION = "leaderboard";

/**
 * Submit skor ke leaderboard
 * @param {string} username - Nama pemain
 * @param {number} score - Skor akhir
 * @param {string} avatar - Ikon avatar (opsional)
 * @returns {Promise<void>}
 */
export const submitScore = async (username, score, avatar = "default") => {
  try {
    console.log("📤 Submitting score:", { username, score, avatar });
    
    const docRef = await addDoc(collection(db, LEADERBOARD_COLLECTION), {
      username: username.trim(),
      score: score,
      avatar: avatar,
      createdAt: serverTimestamp()
    });
    
    console.log("✅ Skor berhasil disimpan dengan ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Error menambahkan skor:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    throw error;
  }
};

/**
 * Ambil top 10 skor dari leaderboard
 * @returns {Promise<Array>} Array of top scores
 */
export const getTopScores = async (limitCount = 10) => {
  try {
    console.log("📥 Fetching top", limitCount, "scores...");
    
    // Query sederhana: hanya sort by score (tidak perlu composite index)
    const q = query(
      collection(db, LEADERBOARD_COLLECTION),
      orderBy("score", "desc"),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const scores = [];
    
    querySnapshot.forEach((doc) => {
      scores.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    console.log("✅ Fetched", scores.length, "scores:", scores);
    return scores;
  } catch (error) {
    console.error("❌ Error mengambil leaderboard:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    
    // Jika error karena index, berikan pesan yang lebih jelas
    if (error.code === 'failed-precondition') {
      console.error("⚠️ FIRESTORE INDEX REQUIRED!");
      console.error("Buka link ini untuk membuat index:", error.message);
    }
    
    throw error;
  }
};
