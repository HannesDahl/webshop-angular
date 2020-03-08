import { Injectable } from '@angular/core';
declare var M: any;

@Injectable({
	providedIn: 'root'
})
export class CartService {
	private array: any = [];
	public key = 'cart-38111152238128';

	constructor() { }

	public addToCart(id) {
		this.array = [];
		let allAddedProducts = localStorage.getItem(this.key);
		allAddedProducts = JSON.parse(allAddedProducts);
		if (allAddedProducts != null) {
			for (let i = 0; i < allAddedProducts.length; i++) {
				this.array.push(allAddedProducts[i])
			}
		}

		this.array.push({ id: id });
		let localStorageObject = JSON.stringify(this.array);
		localStorage.setItem(this.key, localStorageObject);

		M.toast({ html: 'Added to cart!' });
	}

	public removeFromCart(id) {
		console.log(id);
	}
}
