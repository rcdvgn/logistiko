import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export async function addCategory(user, category) {
  if (!user.data.categories.includes(category)) {
    let updatedCategories = [...user.data.categories, category];

    const currUserRef = doc(db, "users", user.uid);
    await updateDoc(currUserRef, {
      categories: updatedCategories,
    });
  }
}
