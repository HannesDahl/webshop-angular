import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        let searchElement = document.getElementById('autocomplete-input');
        let searchValue;
        document.getElementById('search').addEventListener('click', (function (event) {
            // @ts-ignore
            searchValue = searchElement.value;
            if (searchValue == '') {
                event.preventDefault();
                // @ts-ignore
                M.toast({
                    html: 'Insert a search value!',
                });
            } else {
                location.pathname = `/search/${searchValue}`;
            }
        }));

        searchElement.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                // @ts-ignore
                searchValue = searchElement.value;
                if (searchValue == '') {
                    event.preventDefault();
                    // @ts-ignore
                    M.toast({
                        html: 'Insert a search value!',
                    });
                } else {
                    location.pathname = `/search/${searchValue}`;
                }
            }
        });
    }

}
