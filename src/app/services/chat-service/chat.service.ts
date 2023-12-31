import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  setDoc,
  query,
  orderBy,
  onSnapshot,
  where,
  getDoc,
  collectionData,
  limit,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private firestore: Firestore) {}

  // Function to create or get chatId for conversation
  async getOrCreateConversationId(userId: string, recipientId: string) {

    if (userId === recipientId) {
      throw new Error('You cannot start a chat with yourself.');
    }
    const chatId =
      userId < recipientId
        ? `${userId}_${recipientId}`
        : `${recipientId}_${userId}`;
    const conversationRef = doc(this.firestore, 'conversations', chatId);

    // Check if conversation exists, if not, create it
    const conversation = await (await getDoc(conversationRef)).data();
    if (!conversation) {
      await setDoc(conversationRef, {
        chatId: chatId,
        messages: [],
        userIds: [userId, recipientId],
      });
    }

    return chatId;
  }

  // Function to send a message
  async sendMessage(chatId: string, text: string, userId: string) {
    const messagesRef = collection(
      this.firestore,
      'conversations',
      chatId,
      'messages'
    );
    await addDoc(messagesRef, {
      text,
      userId,
      createdAt: new Date(),
    });
    // Update conversation's last message timestamp here
    // This part is omitted for simplicity but should be implemented
  }

  getMessages(chatId: string): Observable<any[]> {
    return new Observable((observer) => {
      const messagesRef = collection(
        this.firestore,
        'conversations',
        chatId,
        'messages'
      );
      const q = query(messagesRef, orderBy('createdAt', 'asc'));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const messages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          observer.next(messages);
        },
        (error) => {
          observer.error(error);
        }
      );

      return () => unsubscribe();
    });
  }

  getLastMessage(chatId: string): Observable<any> {
    const messagesRef = collection(
      this.firestore,
      'conversations',
      chatId,
      'messages'
    );
    const q = query(messagesRef, orderBy('createdAt', 'desc'), limit(1));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }

  getConversations(userId: string): Observable<any[]> {
    const conversationsRef = collection(this.firestore, 'conversations');
    const q = query(
      conversationsRef,
      where('userIds', 'array-contains', userId)
    );
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }
}
