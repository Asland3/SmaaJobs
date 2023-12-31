import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updatePassword,
} from '@angular/fire/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc  } from '@angular/fire/firestore';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private auth: Auth) {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.getUser(user.uid).then((userData) => {
          this.currentUser.next(userData);
        });
      } else {
        this.currentUser.next(null);
      }
    });
  }

  initAuthListener(resolve: () => void): void { // Corrected signature
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.getUser(user.uid).then((userData) => {
          this.currentUser.next(userData);
          resolve(); // Resolve the promise once user data is fetched
        });
      } else {
        this.currentUser.next(null);
        resolve(); // Resolve the promise even if there's no user
      }
    });
  }

  async register({
    firstName,
    lastName,
    email,
    password,
    age,
    description,
    town,
    postalCode,
    phone,
    profilePic,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    age: number;
    description: string;
    town: string;
    postalCode: string;
    phone: string;
    profilePic: File;
  }) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        const storage = getStorage();
        const profilePicRef = ref(storage, `profilePics/${user.uid}`);
        await uploadBytes(profilePicRef, profilePic);
        const profilePicUrl = await getDownloadURL(profilePicRef);

        const db = getFirestore();
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          firstName,
          lastName,
          email,
          age,
          description,
          town,
          postalCode,
          phone,
          profilePic: profilePicUrl,
        });
      }
      return user;
    } catch (error: any) {
      console.log('Error during registration: ', error); // Log the error
      if (error.code === 'auth/email-already-in-use') {
        throw new Error(
          'The email address is already in use by another account.'
        );
      } else {
        throw new Error(
          'An error occurred during registration. Please try again.'
        );
      }
    }
  }

  async login({ email, password }: { email: string; password: string }) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const user = userCredential.user;
      return user;
    } catch (error) {
      console.log('Error during login: ', error); // Log the error
      throw new Error('Invalid email or password. Please try again.');
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error('Error signing out:', error); // Log the error
      throw new Error('An error occurred while signing out. Please try again.');
    }
  }

  async googleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      const user = result.user;
      if (user) {
        const { displayName: name, email, photoURL } = user;
        const db = getFirestore();
        await setDoc(
          doc(db, 'users', user.uid),
          {
            uid: user.uid,
            name: name,
            email: email,
            photoURL: photoURL,
          },
          { merge: true }
        );
      }
      return user;
    } catch (error) {
      console.log('Error during Google login: ', error); // Log the error
      throw new Error('Google login failed. Please try again.');
    }
  }

  async forgotPassword({ email }: { email: string }) {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      console.log('Error during password reset: ', error); // Log the error
      throw new Error(
        'An error occurred while sending the password reset email. Please try again.'
      );
    }
  }

  async getUser(uid: string) {
    const db = getFirestore();
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      this.currentUser.next(userData);
      return userData;
    } else {
      console.log('No such user!'); // Log the error
      return null;
    }
  }

  async getSpecificUser(uid: string) {
    const db = getFirestore();
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      return userData;
    } else {
      console.log('No such user!'); // Log the error
      return null;
    }
  }

  //Not used because it required user to veriying new email before changing
  async updateEmail(newEmail: string) {
    try {
      if (this.auth.currentUser) {
        await updateEmail(this.auth.currentUser, newEmail);
        await sendEmailVerification(this.auth.currentUser);
        const db = getFirestore();
        await setDoc(
          doc(db, 'users', this.auth.currentUser.uid),
          {
            email: newEmail,
          },
          { merge: true }
        );
        const userData = await this.getUser(this.auth.currentUser.uid);
        this.currentUser.next(userData);
      }
    } catch (error) {
      console.error('Error updating email:', error); // Log the error
      throw new Error(
        'An error occurred while updating the email. Please try again.'
      );
    }
  }

  async updatePassword(newPassword: string) {
    try {
      if (this.auth.currentUser) {
        await updatePassword(this.auth.currentUser, newPassword);
      }
    } catch (error) {
      console.error('Error updating password:', error); // Log the error
      throw new Error(
        'An error occurred while updating the password. Please try again.'
      );
    }
  }

  async updateName(newName: string) {
    try {
      if (this.auth.currentUser) {
        const db = getFirestore();
        await setDoc(
          doc(db, 'users', this.auth.currentUser.uid),
          {
            name: newName,
          },
          { merge: true }
        );
        const userData = await this.getUser(this.auth.currentUser.uid);
        this.currentUser.next(userData);
        return userData;
      }
    } catch (error) {
      console.error('Error updating name:', error);
      throw new Error(
        'An error occurred while updating the name. Please try again.'
      );
    }
    return null;
  }

  async updateUserData() {
    if (this.auth.currentUser) {
      const userData = await this.getUser(this.auth.currentUser.uid);
      this.currentUser.next(userData);
    } else {
      this.currentUser.next(null);
    }
  }

  async updateUserProfile(uid: string, updatedUserData: any, newProfileImageBlob?: Blob | null) {
    const db = getFirestore();
    const storage = getStorage();
    const userRef = doc(db, 'users', uid);
  
    if (newProfileImageBlob) {
      // Upload det nye profilbillede til Firebase Storage
      const profilePicRef = ref(storage, `profilePics/${uid}/${new Date().getTime()}`);
      await uploadBytes(profilePicRef, newProfileImageBlob);
      const profilePicUrl = await getDownloadURL(profilePicRef);
  
      // Sæt URL'en til det nye billede i updatedUserData
      updatedUserData.profilePic = profilePicUrl;
    }
  
    // Opdater brugerens data i Firestore
    await updateDoc(userRef, updatedUserData);
  }
}
