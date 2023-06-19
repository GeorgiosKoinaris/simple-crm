import { Component, inject } from '@angular/core';
import { User } from 'src/models/user.class';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
})
export class DialogAddUserComponent {
  user: User = new User();
  birthDate!: Date;
  firestore: Firestore = inject(Firestore);
  users$: Observable<any[]>;

  constructor() {
    const aCollection = collection(this.firestore, 'items');
    this.users$ = collectionData(aCollection);
  }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current user is', this.user);

    const itemCollection = collection(this.firestore, 'user');
    addDoc(itemCollection, this.user.toJSON()).then((result) => {
      console.log('Adding user finished', result);
    });
  }
}
