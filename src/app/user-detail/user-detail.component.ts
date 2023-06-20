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

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  users$: Observable<any[]>;
  userId = '';

  constructor(private route: ActivatedRoute) {
    const aCollection = collection(this.firestore, 'user', this.userId);
    this.users$ = collectionData(aCollection);
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    console.log('GOT ID', this.userId);
    this.getUser();
  }

  getUser() {
    const userRef: any = doc(this.firestore, 'user', this.userId);
    this.users$ = docData(userRef);
    console.log('Current User is', this.users$);
  }
}
