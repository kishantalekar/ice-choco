import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updatePhoneNumber,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return userCredential.user;
  } catch (error) {
    console.log("Error signing in:", error.message);
    console.log(error.code);
    return error;
  }
};
export const signUp = async (email, password, form) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    return userCredential.user;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const updateTheUserProfile = (name, imageUrl) => {
  updateProfile(auth.currentUser, {
    displayName: name,
    photoURL: imageUrl || "",
  })
    .then(() => {
      // Profile updated!
      // ...
    })
    .catch((error) => {
      // An error occurred
      // ...
    });
};
export const updateTheUserPhoneNumber = (number) => {
  updatePhoneNumber(auth.currentUser, number)
    .then(() => {})
    .catch((err) => console.log(err));
};

export const onLogOut = async () => {
  try {
    const res = await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};
