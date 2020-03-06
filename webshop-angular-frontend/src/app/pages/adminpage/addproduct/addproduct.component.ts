import { Component, OnInit, Output, ElementRef, ViewChild } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-addproduct',
	templateUrl: './addproduct.component.html',
	styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {
	@ViewChild('nameInput') public nameInput: ElementRef;
	@ViewChild('priceInput') public priceInput: ElementRef;
	@ViewChild('descriptionInput') public descriptionInput: ElementRef;
	@ViewChild('imageInput') public imageInput: ElementRef;
	@Output() categories: any;
	el: ElementRef;

	constructor(
		private _http: HttpService,
		private router: Router
	) { }

	ngOnInit(): void {
		this._http.getCategories().subscribe(
			this._onCategoriesLoaded.bind(this),
			this._onCategoriesLoadFailed.bind(this));

		window.scrollTo(0, 0);
	}

	private _onCategoriesLoaded(data: any): void {
		this.categories = data;
	}

	private _onCategoriesLoadFailed(error: any): void {
		console.error(error);
	}

	public addProduct() {
		let checkbox = document.getElementsByClassName('checkbox');
		let selectedCategoriesHTML = document.querySelector('#selectedCategories');
		let submitBtn = document.querySelector('#submit');
		let selectedCategories = [];

		for (let i = 0; i < checkbox.length; i++) {
			// @ts-ignore
			if (checkbox[i].checked) {
				// @ts-ignore
				selectedCategories.push(JSON.parse(checkbox[i].value));
			}
		}
		// @ts-ignore
		selectedCategoriesHTML.value = selectedCategories;

		this._http.postProduct(this.nameInput.nativeElement.value, this.priceInput.nativeElement.value, this.descriptionInput.nativeElement.value, selectedCategories, this.imageInput.nativeElement.files[0].name);

		this.router.navigate(['/']);
	};
}
