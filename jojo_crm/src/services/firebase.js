import { initializeApp } from "firebase/app";
// eslint-disable-next-line no-unused-vars
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  signOut,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
console.log('Environment check:', {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  allEnv: process.env
}); 
const googleProvider = new GoogleAuthProvider();

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(analytics); //

// Initialize Firebase services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Set Auth persistence to LOCAL
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Firebase Auth persistence set to LOCAL");
  })
  .catch((error) => {
    console.error("Error setting Firebase Auth persistence:", error);
  });

// Existing Firestore and Storage helper functions remain the same...

// Updated Auth helper functions for passwordless authentication
const firebaseAuth = {
  signInWithGoogle: async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      // This gives you a Google Access Token
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken; // eslint-disable-line no-unused-vars

      // The signed-in user info
      const user = result.user;

      return user;
    } catch (error) {
      // Handle Errors here
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used
      const email = error.customData.email;
      // The AuthCredential type that was used
      const credential = GoogleAuthProvider.credentialFromError(error);

      console.error("Google Sign-In Error:", {
        errorCode,
        errorMessage,
        email,
        credential,
      });

      throw error;
    }
  },
  // Send sign-in link to email
  // Function to send sign-in link
  sendSignInLink: async (email) => {
    const actionCodeSettings = {
      // URL you want to redirect back to. Must be whitelisted in the Firebase Console.
      url:
        process.env.VUE_APP_SIGN_IN_REDIRECT_URL ||
        "http://localhost:8080/signin",
      handleCodeInApp: true, // Must be true for email link sign-in
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);

      // Save the email temporarily in sessionStorage to use in the sign-in confirmation
      sessionStorage.setItem("emailForSignIn", email);

      return true;
    } catch (error) {
      console.error("Error sending sign-in link", error);
      throw error;
    }
  },

  // Function to complete sign-in from email link
  completeSignIn: async (window) => {
    try {
      console.log("Current URL:", window.location.href);
      console.log("Stored email:", sessionStorage.getItem("emailForSignIn"));

      // Check if it's a sign-in with email link
      if (!isSignInWithEmailLink(auth, window.location.href)) {
        console.warn("Not a valid sign-in link");
        throw new Error("Not a valid sign-in link");
      }

      // Get the email from session storage
      let email = sessionStorage.getItem("emailForSignIn");

      if (!email) {
        const previousEmail = sessionStorage.getItem("lastUsedSignInEmail");

        if (previousEmail) {
          email = previousEmail;
        } else {
          // If no email is found, prompt the user
          email = window.prompt(
            "Please provide the email you used to request the sign-in link"
          );
        }
      }

      if (!email) {
        throw new Error("No email found for sign-in confirmation");
      }

      // Complete the sign-in
      const result = await signInWithEmailLink(
        auth,
        email,
        window.location.href
      );

      // Store the last used email in session storage
      sessionStorage.setItem("lastUsedSignInEmail", email);

      // Clear the email from session storage
      sessionStorage.removeItem("emailForSignIn");

      // Mark the sign-in process as complete in session storage
      sessionStorage.setItem("isSignInComplete", "true");

      return result;
    } catch (error) {
      console.error("Detailed sign-in link error:", {
        message: error.message,
        code: error.code,
        url: window.location.href,
        storedEmail: sessionStorage.getItem("emailForSignIn"),
        lastUsedEmail: sessionStorage.getItem("lastUsedSignInEmail"),
      });
      throw error;
    }
  },

  // Sign out
  signOut: async () => {
    return await signOut(auth);
  },

  // Get current user
  getCurrentUser: () => {
    return auth.currentUser;
  },

  // Listen for authentication state changes
  onAuthStateChanged: (callback) => {
    return onAuthStateChanged(auth, callback);
  },
};

export { db, auth, firebaseAuth, storage };
