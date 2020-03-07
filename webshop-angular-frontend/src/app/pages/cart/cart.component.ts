import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { QueryFilterService } from '../../services/query-filter.service';
import { Router, NavigationEnd } from '@angular/router';

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
		private QueryFilter: QueryFilterService,
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
		let num = 0;
		while (localStorage.getItem('key' + num)) {
			this.cartProducts.push(localStorage.getItem('key' + num));
			num++;
		}

		this.cartItemsString = `?id=${this.cartProducts}`;
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

	public removeFromCart(e, product) {
		e.target.parentElement.parentElement.remove();
		console.log(product);
	}

}
