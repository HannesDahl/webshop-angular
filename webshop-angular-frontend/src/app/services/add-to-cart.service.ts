import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AddToCartService {
	number: number = 0;

	constructor() { }

	addToCart(id) {
		if (localStorage.length) {
			this.number = localStorage.length;
		}
		let key = 'key' + this.number++;
		localStorage.setItem(key, id);
	}
}
