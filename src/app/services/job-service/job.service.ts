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
} from '@angular/fire/firestore';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import { Observable } from 'rxjs';

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
      // Hent brugerens data for at få profilbillede URL
      const userDocRef = doc(db, 'users', this.auth.currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);
      const userProfilePicUrl = userDocSnap.exists() ? userDocSnap.data()['profilePic'] : null;

  
      // Upload fotos til storage og få deres URL'er
      const photoURLs = [];
      for (const photo of jobData.photos) {
        const photoRef = ref(
          storage,
          `jobPhotos/${this.auth.currentUser.uid}/${new Date().getTime()}`
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
        userId: this.auth.currentUser.uid,
        userProfilePicUrl: userProfilePicUrl, // Tilføj denne linje
      });
    }
  }

  getAllJobs(): Observable<any[]> {
    const db = getFirestore();
    const jobsCollectionRef = collection(db, 'jobs');

    return new Observable((observer) => {
      const unsubscribe = onSnapshot(jobsCollectionRef, (querySnapshot) => {
        const jobs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        observer.next(jobs);
      }, (error: any) => {
        observer.error(error);
      });

      // Returner en afmeldingsfunktion
      return { unsubscribe };
    });
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

  getJob(jobId: string): Observable<any> {
    const db = getFirestore();
    const jobDocRef = doc(db, 'jobs', jobId);
    
    return new Observable((observer) => {
      getDoc(jobDocRef)
        .then(docSnapshot => {
          if (docSnapshot.exists()) {
            observer.next({
              id: docSnapshot.id,
              ...docSnapshot.data()
            });
          } else {
            observer.error(new Error('Job not found'));
          }
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }
}
