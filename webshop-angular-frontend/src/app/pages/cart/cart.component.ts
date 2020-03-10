import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { CartService } from 'src/app/services/cart.service';
import { Router, NavigationEnd } from '@angular/router';
declare var M: any;

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
	@ViewChild('cartSubtotal') public cartSubtotal: ElementRef;
	@ViewChild('cartMoms') public cartMoms: ElementRef;
	@ViewChild('cartTotal') public cartTotal: ElementRef;
	public products: any;
	private cartProducts: any = [];
	private cartItemsString: any;
	private url = window.location.pathname;
	private mySubscription: any;
	public total: number = 0;

	constructor(
		private _http: HttpService,
		public _cart: CartService,
		private router: Router
	) {
		this.router.routeReuseStrategy.shouldReuseRoute = function () {
			return false;
		};
		this.mySubscription = this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.router.navigated = false;
			}
		});
	}

	ngOnDestroy() {
		if (this.mySubscription) {
			this.mySubscription.unsubscribe();
		}
	}

	ngOnInit(): void {
		let key = this._cart.key;
		let itemStorage = localStorage.getItem(key);
		itemStorage = JSON.parse(itemStorage);

		if (itemStorage) {
			for (let i = 0; i < itemStorage.length; i++) {
				// @ts-ignore
				this.cartProducts.push(itemStorage[i].id);
			}
		}

		this.cartItemsString = `?id=${this.cartProducts}`;
		window.scrollTo(0, 0);
	}

	ngAfterViewInit(): void {
		this._http.getCartProducts(this.cartItemsString).subscribe(
			this._onProductsLoaded.bind(this),
			this._onProductsLoadFailed.bind(this));
	}

	ngDoCheck(): void {
		this.loadCartTotals();
	}

	private _onProductsLoaded(data: any): void {
		this.products = data;
		window.addEventListener('load', () => {
			this.loadCartTotals();
		});
	}

	private _onProductsLoadFailed(error: any): void {
		console.error(error);
	}

	private loadCartTotals() {
		this.total = 0;
		let cartProductPrice = document.querySelectorAll('.cart-product-price');

		for (let i = 0; i < cartProductPrice.length; i++) {
			this.total += parseFloat(cartProductPrice[i].textContent);
		}
	}

	public roundToTwoDecimals(num) {
		num = JSON.stringify(num);
		num = num.split('.');

		if (num[1] < 10) {
			num[1] = num[1] + 0;
			num = num.join('.');
			return (Math.round((num) * 100) / 100) + '0';
		} else {
			num = num.join('.');
			return (Math.round((num) * 100) / 100);
		}
	}

	public removeFromCart(e, id) {
		e.target.parentElement.parentElement.remove();
		let currentCart = localStorage.getItem(this._cart.key);
		currentCart = JSON.parse(currentCart);

		for (let i = 0; i < currentCart.length; i++) {
			// @ts-ignore
			if (id === currentCart[i].id) {
				// @ts-ignore
				currentCart.splice(i, 1);
			}
		}

		// @ts-ignore
		if (currentCart.length === 0) {
			this.products = currentCart;
		}
		currentCart = JSON.stringify(currentCart);
		localStorage.setItem(this._cart.key, currentCart);

		M.toast({ html: 'Removed from cart' });
	}

	public quantityInputValue(id) {
		let sum = 0;
		let cartItems = localStorage.getItem(this._cart.key);
		cartItems = JSON.parse(cartItems);
		for (let i = 0; i < cartItems.length; i++) {
			// @ts-ignore
			if (id == cartItems[i].id) {
				// @ts-ignore
				sum = cartItems[i].qty
			}
		}
		return sum;
	}

	public clearCart(e) {
		e.preventDefault();
		this.products = [];
		localStorage.setItem(this._cart.key, '[]');
	}

}
