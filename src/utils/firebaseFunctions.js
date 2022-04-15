import { auth } from "./firebase";
import firebase from "firebase/app";

export const reAuthenticate = password => {
const user = auth.currentUser; // el usuario actual siempre obtener email

// Necesitamos crear las credenciales del usuario
const credentials = firebase.auth.EmailAuthProvider.credential(user.email, password);
//retornamos si el usuario seha reautentificado correctamente
return user.reauthenticateWithCredential(credentials);
}