import { Injectable } from '@angular/core';
declare var M: any;

@Injectable({
	providedIn: 'root'
})
export class CartService {
	public key = 'cart-38111152238128';

	constructor() { }

	public addToCart(id) {
		let currentCart = localStorage.getItem(this.key);
		currentCart = JSON.parse(currentCart);

		let duplicatteStatus = false;
		if (currentCart) {
			for (let i = 0; i < currentCart.length; i++) {
				// @ts-ignore
				if (currentCart[i].id === id) {
					// @ts-ignore
					currentCart[i].qty++;
					duplicatteStatus = true;
					M.toast({ html: 'Increased quantity of added product!' });
					break;
				}
			}
			if (duplicatteStatus === false) {
				// @ts-ignore
				currentCart.push({ id: id, qty: 1 });
				M.toast({ html: 'Added to cart!' });
			}
		} else {
			// @ts-ignore
			currentCart = [{ id: id, qty: 1 }];
			M.toast({ html: 'Added to cart!' });
		}

		localStorage.setItem(this.key, JSON.stringify(currentCart));
	}
}
