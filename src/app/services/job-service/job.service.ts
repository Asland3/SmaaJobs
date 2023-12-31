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
  onSnapshot,
  getDoc,
  serverTimestamp,
  orderBy,
} from '@angular/fire/firestore';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import { AuthService } from '../auth-service/auth.service';
import { Jobs } from 'src/app/models/jobs.model';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private currentUser: any;

  constructor(private authService: AuthService) {
    this.initializeCurrentUser();
  }

  private initializeCurrentUser() {
    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
  }

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

    if (this.currentUser) {
      const photoURLs = [];
      for (const photo of jobData.photos) {
        const photoRef = ref(
          storage,
          `jobPhotos/${this.currentUser.uid}/${new Date().getTime()}`
        );
        await uploadBytes(photoRef, photo);
        const photoURL = await getDownloadURL(photoRef);
        photoURLs.push(photoURL);
      }

      await addDoc(collection(db, 'jobs'), {
        title: jobData.title,
        subline: jobData.subline,
        category: jobData.category,
        description: jobData.description,
        payment: jobData.payment,
        photos: photoURLs,
        userId: this.currentUser.uid,
        firstName: this.currentUser.firstName,
        lastName: this.currentUser.lastName,
        userProfilePicUrl: this.currentUser.profilePic,
        createdAt: serverTimestamp(),
      });
    }
  }

  async getAllJobs(): Promise<any[]> {
    const db = getFirestore();
    const jobsCollectionRef = query(
      collection(db, 'jobs'),
      orderBy('createdAt', 'desc')
    );

    try {
      const querySnapshot = await getDocs(jobsCollectionRef);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error fetching jobs: ', error);
      throw error;
    }
  }

  async getJobsForUser() {
    const db = getFirestore();
    if (this.currentUser.uid) {
      const q = query(
        collection(db, 'jobs'),
        where('userId', '==', this.currentUser.uid),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const jobs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return jobs;
    }
    return [];
  }

  async getJobsfromSpecificUser(userid: string) {
    const db = getFirestore();
    if (userid) {
      const q = query(
        collection(db, 'jobs'),
        where('userId', '==', userid),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const jobs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return jobs;
    }
    return [];
  }

  async updateJob(jobId: string, newJobData: any, imageBlobs: Blob[]) {
    const db = getFirestore();
    const storage = getStorage();
    const jobRef = doc(db, 'jobs', jobId);
  
    // Upload images to Firebase Storage and get their URLs
    const photoURLs = [];
    for (const blob of imageBlobs) {
      if (blob !== null) {
        const photoRef = ref(
          storage,
          `jobPhotos/${this.currentUser.uid}/${new Date().getTime()}`
        );
        await uploadBytes(photoRef, blob);
        const photoURL = await getDownloadURL(photoRef);
        photoURLs.push(photoURL);
      }
    }
  
    // Replace Blob objects with URLs in newJobData
    newJobData.photos = photoURLs;
  
    // Update the document in Firestore
    await updateDoc(jobRef, newJobData);
  }
  
  async deleteJob(jobId: string) {
    const db = getFirestore();
    const jobRef = doc(db, 'jobs', jobId);
    await deleteDoc(jobRef);
  }
  
  async getJob(jobId: string): Promise<Jobs | null> {
    const db = getFirestore();
    const jobDocRef = doc(db, 'jobs', jobId);
  
    const docSnapshot = await getDoc(jobDocRef);
    if (docSnapshot.exists()) {
      return { id: docSnapshot.id, ...(docSnapshot.data() as Jobs) };
    } else {
      console.log('No such document!');
      return null;
    }
  }
}
