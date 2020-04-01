import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { User, auth } from 'firebase/app';
import { Router } from '@angular/router';
declare var M: any;

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    public account: any;
    itemRef: any;
    user: User;

    constructor(
        public auth: AngularFireAuth,
        private afDatabase: AngularFireDatabase,
        private router: Router
    ) {
        this.auth.authState.subscribe((data) => {
            if (data === null) {
                this.router.navigate(['/']);
            }
        });
    }

    ngOnInit(): void { }

    ngAfterViewInit() {
        this.auth.authState.subscribe((data) => {
            if (data !== null) {
                this.auth.user.subscribe((account) => {
                    this.itemRef = this.afDatabase.object(`users/${account.uid}`);
                    this.itemRef.snapshotChanges().subscribe(data => {
                        this.account = data.payload.val();
                    });
                    setTimeout(() => {
                        if (account) {
                            let el = document.getElementsByClassName('tabs')[1];
                            M.Tabs.init(el);
                            M.updateTextFields();

                            let indicatorEl: any = document.querySelector('.indicator');
                            indicatorEl.style.backgroundColor = 'transparent';
                        }
                    }, 1000);
                });
            }
        });
    }
}