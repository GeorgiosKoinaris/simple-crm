import { Component, inject } from '@angular/core';
import { Firestore, doc, docData, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss'],
})
export class DialogEditUserComponent {
  firestore: Firestore = inject(Firestore);
  users$: Observable<any[]> | undefined;
  user: User = new User();
  userId!: string;
  birthDate!: Date;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) {}

  saveUser() {
    this.loading = true;
    const userRef: any = doc(this.firestore, 'user', this.userId);
    this.users$ = docData(userRef);

    updateDoc(userRef, this.user.toJSON()).then(() => {
      this.loading = false;
      this.dialogRef.close();
    });
  }
}
