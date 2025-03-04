import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "",         // paste your firebase confirguration here 
  authDomain: "",     
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function showMessage(msg, divid) {
  const msgDiv = document.getElementById(divid);
  msgDiv.style.display = "block";
  msgDiv.innerHTML = msg;
  msgDiv.style.opacity = 1;
  setTimeout(() => {
    msgDiv.style.opacity = 0;
  }, 5000);
}

// Handle Sign up
const signUpForm = document.querySelector("#signUpForm form");
signUpForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("signupemail").value;
  const password = document.getElementById("signuppassword").value;
  const firstname = document.getElementById("rfname").value;
  const lastname = document.getElementById("rlname").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user in Firestore
    const userdata = { email, firstname, lastname };
    await setDoc(doc(db, "users", user.uid), userdata);

    showMessage("Account created successfully", "messagesignup");
    window.location.href = "index.html";
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      showMessage("Email already exists", "messagesignup");
    } else {
      showMessage("Unable to register user: " + error.message, "messagesignup");
    }
  }
});

const signin = document.getElementById("submitsignin");
signin.addEventListener('click', async (event) => {
  event.preventDefault();

  const email = document.getElementById("remail").value;
  const password = document.getElementById("rpassword").value;
  const auth = getAuth();

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    showMessage("Login Successful", "messagesignin");

    localStorage.setItem("loggedInUserId", user.uid);

    window.location.href = "dashboard.html";
  } catch (error) {
    console.error("Sign-in error:", error);

    if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password") {
      showMessage("Invalid Credentials", "messagesignin");
    } else if (error.code === "auth/user-not-found") {
      showMessage("Account doesn't exist", "messagesignin");
    } else {
      showMessage("Error: " + error.message, "messagesignin");
    }
  }
});
