import { Component, inject } from '@angular/core';
import { User } from 'src/models/user.class';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
})
export class DialogAddUserComponent {
  user: User = new User();
  birthDate!: Date;
  loading = false;

  firestore: Firestore = inject(Firestore);
  users$: Observable<any[]>;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {
    const aCollection = collection(this.firestore, 'items');
    this.users$ = collectionData(aCollection);
  }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current user is', this.user);
    this.loading = true;

    const itemCollection = collection(this.firestore, 'user');
    addDoc(itemCollection, this.user.toJSON()).then((result) => {
      console.log('Adding user finished', result);
      this.loading = false;
      this.dialogRef.close();
    });
  }
}
