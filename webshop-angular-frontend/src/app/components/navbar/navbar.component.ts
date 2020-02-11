import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        // let tabs = document.getElementsByClassName('tab');
        // for (let i = 0; i < tabs.length; i++) {
        //     if (window.location.pathname == tabs[i].firstChild.pathname) {
        //         tabs[i].classList.add('active');
        //     } else {
        //         tabs[i].classList.remove('active');
        //     }
        // }

        // let searchElement = document.getElementById('autocomplete-input');
        // let searchValue;
        // searchElement.addEventListener('keypress', (event) => {

        //     if (event.key === 'Enter') {
        //         searchValue = searchElement.value;
        //         if (searchValue == '') {
        //             event.preventDefault();
        //             M.toast({
        //                 html: 'Insert a search value!',
        //             })
        //         } else {
        //             location.pathname = `/s/${searchValue}`;
        //         }
        //     }
        // });
    }

}
