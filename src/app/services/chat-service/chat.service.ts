import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private firestore: Firestore) {}

  // Function to send a message
  async sendMessage(text: string, userId: string, recipientId: string) {
    const messagesRef = collection(this.firestore, 'messages');
    await addDoc(messagesRef, {
      text,
      userId,
      createdAt: new Date(),
    });
  }

  // Function to listen for new messages
  getMessages(userId: string): Observable<any[]> {
    return new Observable((observer) => {
      const messagesRef = collection(this.firestore, 'messages');
      const q = query(messagesRef, where('userId', '==', userId), orderBy('createdAt', 'asc'));
  
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Fetched messages:", messages);
        observer.next(messages);
      }, (error) => {
        console.error("Error fetching messages:", error);
        observer.error(error);
      });
  
      return () => unsubscribe();
    });
  }
  
}
