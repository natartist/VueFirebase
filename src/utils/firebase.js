import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCZSTn1EXOPsN1tyAe9m4Aie97mNS23Ugg",
  authDomain: "vuefirebase-51e4c.firebaseapp.com",
  projectId: "vuefirebase-51e4c",
  storageBucket: "vuefirebase-51e4c.appspot.com",
  messagingSenderId: "720082621424",
  appId: "1:720082621424:web:7090e70e3b07ea99674335"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const storage = firebase.storage();
const db = firebase.firestore();

//Exportaciones

export { auth, storage, db };

// //Funciones

// //Vamos a crear el usuario en firebase
// export const userCreated =  async( email, password) => {
//   await createUserWithEmailAndPassword(auth, email, password);
// }

// //Iniciar la sesion
// export const login =  async (email, password) => {
//   await signInWithEmailAndPassword(auth, email, password);
// }

// //Para cerrar la sesión
// export const userSignOut = () => {
//   signOut(auth);
// }

// // Para Actualizar el Usuario
// export const updateUserProfile = async (name) => {
//   await updateProfile(auth.currentUser, {
//     displayName: name
//   })
// }