import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
declare var M: any;

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    @ViewChild('searchElement') public searchElement: ElementRef;
    instance: any;

    constructor(
        private router: Router,
        public auth: AngularFireAuth
    ) { }

    ngOnInit() { }

    ngAfterViewInit(): void {
        if (this.auth.user) {
            setTimeout(() => {
                var elems = document.querySelectorAll('.dropdown-trigger');
                M.Dropdown.init(elems, {
                    coverTrigger: false
                });
            }, 1000);
        }

        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.sidenav');
            M.Sidenav.init(elems, {
                edge: 'right'
            });
        });
    }

    public enterSearch(e) {
        let searchElement = this.searchElement.nativeElement;
        let searchValue;

        if (e.key === 'Enter') {
            searchValue = searchElement.value;
            if (searchValue == '') {
                e.preventDefault();
                M.toast({
                    html: 'Insert a search value!'
                });
            } else {
                this.search(searchValue);
            }
        }
    }

    public clickSearch(e) {
        e.preventDefault();

        let searchElement: any = document.getElementById('autocomplete-input');
        let searchValue;
        searchValue = searchElement.value;
        if (searchValue == '') {
            event.preventDefault();
            M.toast({
                html: 'Insert a search value!'
            });
        } else {
            this.search(searchValue);
        }
    }

    public search(searchValue) {
        this.router.navigate([`/search/${searchValue}`]);
    }

    signOut(e) {
        e.preventDefault();
        this.auth.signOut();
    }
}
