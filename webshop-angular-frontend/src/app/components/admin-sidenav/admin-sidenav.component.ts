import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-admin-sidenav',
	templateUrl: './admin-sidenav.component.html',
	styleUrls: ['./admin-sidenav.component.scss']
})
export class AdminSidenavComponent implements OnInit {

	constructor() { }

	ngOnInit(): void { }

	ngAfterViewChecked(): void {
		let sideNavLinks = document.getElementsByClassName('side-nav-link');

		for (let i = 0; i < sideNavLinks.length; i++) {
			// @ts-ignore
			if (window.location.pathname.includes(sideNavLinks[i].childNodes[1].href.replace(/^.*[\\\/]/, ''))) {
				sideNavLinks[i].classList.add('active');
			} else {
				sideNavLinks[i].classList.remove('active');
			}
		}
	}

}
