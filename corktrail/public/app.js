import { findVineyards } from "./map.js";
import { auth, db } from "./firebase-config.js";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

window.app = {
  async showReviewForm(placeId) {
    const user = auth.currentUser;
    if (!user) return alert("Please log in first");
    const rating = prompt("Rate wine (1-5 stars):");
    await addDoc(collection(db, "reviews"), { placeId, userId: user.uid, rating: parseInt(rating), timestamp: Date.now() });
    alert("Thanks for your review!");
  }
};

document.getElementById("search-btn").onclick = () => {
  const q = document.getElementById("location-input").value.trim();
  const validZipOrCity = /^[a-zA-Z\s\d]{2,}$/;

  if (!validZipOrCity.test(q)) {
    alert("Please enter a valid city or ZIP code.");
    return;
  }

  findVineyards(q);
};
