import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBWMLEBqNsZJS2iZDZiS8YT4oBJ9FhJfRc",
    authDomain: "login-app-b2f27.firebaseapp.com",
    projectId: "login-app-b2f27",
    storageBucket: "login-app-b2f27.firebasestorage.app",
    messagingSenderId: "598921171230",
    appId: "1:598921171230:web:90bb53769bac6386e4f90f"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth=getAuth(app);

  const db=getFirestore(app);

  onAuthStateChanged(auth, async (user) => {
    const loggedInUserId = localStorage.getItem("loggedInUserId");
  
    if (loggedInUserId) {
      console.log("Fetching data for user ID:", loggedInUserId);
      
      try {
        const docRef = doc(db, "users", loggedInUserId);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const userData = docSnap.data();
          document.getElementById("Loggeduserfname").innerText = userData.firstname;
          document.getElementById("Loggeduserlname").innerText = userData.lastname;
          document.getElementById("Loggeduseremail").innerText = userData.email;
        } else {
          console.log("User document not found in Firestore.");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    } else {
      console.log("User ID not found in local storage.");
    }
  });
  const logout=document.getElementById('logout');
  logout.addEventListener('click' ,()=>
  {
localStorage.removeItem('loggedInUserId');
signOut(auth)
.then(()=>
{
  window.location.href='index.html';
})
.catch(error)
{
  console.log("error sign out",error);
}
  })