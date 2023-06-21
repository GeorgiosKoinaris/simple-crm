import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  users$: Observable<any[]> | undefined;
  userId = '';
  user: User = new User();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    console.log('GOT ID', this.userId);
    this.getUser();
  }

  getUser() {
    const userRef: any = doc(this.firestore, 'user', this.userId);
    this.users$ = docData(userRef);

    this.users$.subscribe((user) => {
      this.user = new User(user);
      console.log('current User is ', user);
    });
  }

  openAdressDialog() {}
  editMenu() {}
  editUserDetail() {}
}
