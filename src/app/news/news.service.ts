import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { News } from './news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  newsCollection: AngularFirestoreCollection<News>;
  newsDoc: AngularFirestoreDocument<News>;

  constructor(private readonly afs: AngularFirestore) {
    this.newsCollection = this.afs.collection('news', ref => ref.orderBy('published', 'desc'));
  }

  getNews() {
      return this.newsCollection.snapshotChanges();
  }

  getActiveNews() {
    return this.afs.collection('news', ref => ref.orderBy('published', 'desc').where('active', '==', true)).snapshotChanges();
  }

  getSingleNewsData(id: string) {
    this.newsDoc = this.afs.doc<News>(`news/${id}`);
    return this.newsDoc.valueChanges();
  }

  create(data: News) {
    return this.newsCollection.add(data);
  }

  getSingleNews(id: string) {
    return this.afs.doc<News>(`news/${id}`);
  }

  update(id: string, data) {
    return this.getSingleNews(id).update(data);
  }

  delete(id: string) {
    return this.getSingleNews(id).delete();
  }
}
