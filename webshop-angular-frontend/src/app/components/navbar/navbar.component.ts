import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
declare var M: any;

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    @ViewChild('searchElement') public searchElement: ElementRef;

    constructor(private router: Router) { }

    ngOnInit() { }

    ngAfterViewInit(): void {
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.sidenav');
            var instances = M.Sidenav.init(elems, {
                edge: 'right'
            });
        });
    }

    public enterSearch(e) {
        let searchElement = this.searchElement.nativeElement;
        let searchValue;

        if (e.key === 'Enter') {
            // @ts-ignore
            searchValue = searchElement.value;
            if (searchValue == '') {
                e.preventDefault();
                // @ts-ignore
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

        let searchElement = document.getElementById('autocomplete-input');
        let searchValue;
        // @ts-ignore
        searchValue = searchElement.value;
        if (searchValue == '') {
            event.preventDefault();
            // @ts-ignore
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
}
