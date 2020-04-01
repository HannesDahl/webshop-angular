import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-public-view',
    templateUrl: './public-view.component.html',
    styleUrls: ['./public-view.component.scss']
})
export class PublicViewComponent implements OnInit {

    constructor(
        public auth: AuthService
    ) { }

    ngOnInit(): void {
        document.body.style.backgroundColor = '#fff'
    }

}
