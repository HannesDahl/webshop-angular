import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTable } from "simple-datatables"
import { HttpService } from '../../../services/http.service';
declare let M: any;

@Component({
	selector: 'app-productlist',
	templateUrl: './productlist.component.html',
	styleUrls: ['./productlist.component.scss']
})
export class ProductlistComponent implements OnInit {
	@ViewChild('productsTable') public productsTable: any;
	private products: any;
	private myData: any;
	private fullProductsArr: any = [];

	constructor(
		private _http: HttpService
	) { }

	ngOnInit(): void {
		this._http.getAllProducts().subscribe(
			this._onProductsLoaded.bind(this),
			this._onProductsLoadFailed.bind(this));
	}

	ngAfterViewInit() {
		document.addEventListener('DOMContentLoaded', function () {
			var elems = document.querySelectorAll('.modal');
			var instances = M.Modal.init(elems);
		});

		const modalCloseButton = document.getElementsByClassName('modal-close');
		modalCloseButton[0].addEventListener('click', (e) => {
			e.preventDefault();
		});
	}

	private _onProductsLoaded(data: any): void {
		this.products = data;

		for (let i = 0; i < this.products.length; i++) {
			this.fullProductsArr.push([this.products[i].id, this.products[i].name, this.products[i].price, this.products[i].description])
		}

		this.myData = {
			headings: [
				"ID",
				"Name",
				"Price",
				"Description"
			],
			data: this.fullProductsArr
		}

		const dataTable = new DataTable("#productsTable", {
			data: this.myData
		});

		let dataTableSelector: any = document.getElementsByClassName('dataTable-selector');
		dataTableSelector[0].style.display = 'block'
	}

	public editProductModal(id) {
		console.log(id);
	}

	private _onProductsLoadFailed(error: any): void {
		console.error(error);
	}
}
