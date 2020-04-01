import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    constructor(
        private _location: Location,
        private router: Router,
        public authService: AuthService
    ) { }

    ngOnInit(): void {
        document.body.style.backgroundColor = '#212121';
    }

    pageBack() {
        this._location.back();
    }

    home() {
        this.router.navigate(['/']);
    }
}
