import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private auth: Auth) {}

  async addJob(jobData: {
    title: string;
    subline: string;
    category: string;
    description: string;
    payment: number;
    photos: File[];
  }) {
    const db = getFirestore();
    const storage = getStorage();

    if (this.auth.currentUser) {
      // Initialize an array to store the URLs of uploaded photos
      const photoURLs = [];
  
      // Loop through each photo Blob and upload it
      for (const photo of jobData.photos) {
        const photoRef = ref(
          storage,
          `jobPhotos/${this.auth.currentUser.uid}/${new Date().getTime()}`
        );
        await uploadBytes(photoRef, photo);
        const photoURL = await getDownloadURL(photoRef);
        photoURLs.push(photoURL);
      }

      // Add job data to Firestore
      await addDoc(collection(db, 'jobs'), {
        title: jobData.title,
        subline: jobData.subline,
        category: jobData.category,
        description: jobData.description,
        payment: jobData.payment,
        photo: photoURLs,
        userId: this.auth.currentUser.uid, // Associate job with the user's UID
      });
    }
  }

  async getAllJobs() {
    const db = getFirestore();
    const q = query(collection(db, 'jobs'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  async getJobsForUser() {
    const db = getFirestore();
    if (this.auth.currentUser) {
      const q = query(
        collection(db, 'jobs'),
        where('userId', '==', this.auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => doc.data());
    }
    return [];
  }

  async updateJob(jobId: string, newJobData: any) {
    const db = getFirestore();
    const jobRef = doc(db, 'jobs', jobId);
    await updateDoc(jobRef, newJobData);
  }

  async deleteJob(jobId: string) {
    const db = getFirestore();
    const jobRef = doc(db, 'jobs', jobId);
    await deleteDoc(jobRef);
  }
}
