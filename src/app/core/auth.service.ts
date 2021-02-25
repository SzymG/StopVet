import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    authState: any = null;

    constructor(public afAuth: AngularFireAuth) {
        this.afAuth.authState.subscribe((data) => {
            this.authState = data;
        })
    }

    get authenticated(): boolean {
        return this.authState !== null;
    }

    get currentUserId(): string {
        return this.authenticated ? this.authState.uid : null;
    }

    isFirebaseAuthenticated() {
        return this.afAuth.authState.pipe(first()).toPromise();
    }

    login(formData) {
        const {email, password} = formData;
        return this.afAuth.signInWithEmailAndPassword(email, password);
    }

    logout() {
        return this.afAuth.signOut();
    }
}
