import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    adminOrNot: any;

    constructor(
        public afAuth: AngularFireAuth,
        public afDatabase: AngularFireDatabase,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.adminAccount();
    }

    adminAccount() {
        this.afAuth.authState.subscribe((data) => {
            if (data !== null) {
                this.afAuth.user.subscribe((account) => {
                    let itemRef = this.afDatabase.object(`users/${account.uid}`);
                    itemRef.snapshotChanges().subscribe(data => {
                        let account: any = data.payload.val();
                        this.adminOrNot = account.admin;
                    });
                });
            } else return;
        });
    }
}
