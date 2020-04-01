import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(
        private _location: Location,
        public authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        document.body.style.backgroundColor = '#212121'
    }

    pageBack() {
        this._location.back();
    }

    home() {
        this.router.navigate(['/']);
    }
}