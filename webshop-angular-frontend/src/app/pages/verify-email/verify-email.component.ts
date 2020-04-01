import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verify-email',
  template: `
  <div class="container wrapper">
    <div class="center">
        <div class="col s12 m4">
            <div class="card grey darken-3">
                <div class="card-content white-text">
                    <span class="card-title center">Please verify your email</span>
                    <p>Please check your email to verify your email so that we know you're not a robot!</p>
                    <a routerLink="/" class="btn blue mt4">Home</a>
                </div>
            </div>
        </div>
    </div>
  </div>
  `
})
export class VerifyEmailComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}
