import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private firestore: Firestore) {}

  // Function to send a message
  async sendMessage(text: string, userId: string) {
    const messagesRef = collection(this.firestore, 'messages');
    await addDoc(messagesRef, {
      text,
      userId,
      createdAt: new Date(),
    });
  }

  // Function to listen for new messages
  getMessages(): Observable<any[]> {
    return new Observable((observer) => {
      const messagesRef = collection(this.firestore, 'messages');
      const q = query(messagesRef, orderBy('createdAt', 'asc'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        observer.next(messages);
      }, observer.error);

      // Cleanup subscription on unsubscribe
      return { unsubscribe };
    });
  }
}
