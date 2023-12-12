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
      userId,         // The sender's user ID
      recipientId,    // The recipient's user ID
      createdAt: new Date(),
    });
  }
  

  // Function to listen for new messages
  getMessages(userId: string): Observable<any[]> {
    console.log("hit")
    return new Observable((observer) => {
      const messagesRef = collection(this.firestore, 'messages');
      // Query messages sent by the user
      const q = query(messagesRef, where('userId', '==', userId), orderBy('createdAt', 'asc'));
      
  
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(messages)
        observer.next(messages);
      }, observer.error);
  
      return { unsubscribe };
    });
  }
  
  
}
