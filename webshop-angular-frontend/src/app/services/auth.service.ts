import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFireDatabase } from '@angular/fire/database';
import { User, auth } from 'firebase/app';
import 'firebase/database';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user: User;

    constructor(
        public afAuth: AngularFireAuth,
        public afFunctions: AngularFireFunctions,
        public afDatabase: AngularFireDatabase,
        public router: Router
    ) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.user = user;
                localStorage.setItem('user', JSON.stringify(this.user));
            } else {
                localStorage.setItem('user', null);
            }
        })
    }

    adminAccount() {
        let adminOrNot;
        this.afAuth.authState.subscribe((data) => {
            if (data !== null) {
                this.afAuth.user.subscribe((account) => {
                    let itemRef = this.afDatabase.object(`users/${account.uid}`);
                    itemRef.snapshotChanges().subscribe(data => {
                        let account: any = data.payload.val();
                        adminOrNot = account.admin;
                    });
                });
            }
        });
        return adminOrNot
    }

    async loginWithMail(email: string, password: string) {
        await this.afAuth.signInWithEmailAndPassword(email, password);
        this.router.navigate(['/']);
    }

    async registerWithMail(username: string, email: string, password: string) {
        await this.afAuth.createUserWithEmailAndPassword(email, password);
        this.sendEmailVerification(username, password);
    }

    async sendEmailVerification(username, password) {
        await (await this.afAuth.currentUser).sendEmailVerification();

        let uid = this.user.uid;

        this.router.navigate(['/verify-email']);
        await await await this.addAccountToDatabase(uid, username, password);
    }

    async logout() {
        await this.afAuth.signOut();
        localStorage.removeItem('user');
        this.router.navigate(['/']);
    }

    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return user !== null;
    }

    async loginWithGoogle() {
        await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());

        setTimeout(() => {
            let displayName = this.user.displayName;
            let uid = this.user.uid;
            this.addAccountToDatabase(uid, displayName, '');
        }, 250);

        this.router.navigate(['/']);
    }

    private addAccountToDatabase(uid: string, username: string, password: string) {
        this.afDatabase.object(`users/${uid}`).set({
            username: username,
            password: password,
            admin: false
        });
    }
}