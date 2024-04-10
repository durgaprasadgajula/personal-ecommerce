import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDk5P462SORNAxYmgrVILxj6QCTel2apCg",
    authDomain: "nxttrendz-69608.firebaseapp.com",
    projectId: "nxttrendz-69608",
    storageBucket: "nxttrendz-69608.appspot.com",
    messagingSenderId: "557688765933",
    appId: "1:557688765933:web:ba07d5a3741e667a687be4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const gprovider = new GoogleAuthProvider();
export const auth = getAuth();
export default app;
