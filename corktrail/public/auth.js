import { auth, provider } from "./firebase-config.js";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
const loginBtn = document.getElementById("login-btn"), logoutBtn = document.getElementById("logout-btn");

loginBtn.onclick = () => signInWithPopup(auth, provider);
logoutBtn.onclick = () => signOut(auth);

onAuthStateChanged(auth, user => {
  if (user) {
    loginBtn.hidden = true;
    logoutBtn.hidden = false;
  } else {
    loginBtn.hidden = false;
    logoutBtn.hidden = true;
  }
});
