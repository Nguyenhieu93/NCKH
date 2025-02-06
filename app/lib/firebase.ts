import { initializeApp, getApps } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { getDatabase, ref, set, get } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyBPM_9E-wIKJx-X9FA1T_yt5n_7P6kE3GU",
  authDomain: "hieu-1e3e4.firebaseapp.com",
  projectId: "hieu-1e3e4",
  storageBucket: "hieu-1e3e4.firebasestorage.app",
  messagingSenderId: "586003278824",
  appId: "1:586003278824:web:f5ac231367f97af4df125d",
  measurementId: "G-4DXLG1QEZV",
  databaseURL: "https://hieu-1e3e4-default-rtdb.asia-southeast1.firebasedatabase.app", // Thêm dòng này
}

let app 
let auth : any
let database 

if (typeof window !== "undefined" && !getApps().length) {
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  database = getDatabase(app)
}

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, database, ref, set, get }

