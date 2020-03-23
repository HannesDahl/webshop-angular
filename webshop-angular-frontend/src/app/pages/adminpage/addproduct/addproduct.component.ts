import { Component, OnInit, Output, ElementRef, ViewChild } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';
declare var M: any;

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
	filePath: any;
	imagesNamesArr: any = [];

	constructor(
		private _http: HttpService,
		private router: Router,
		private storage: AngularFireStorage
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

	private createRandomString(length) {
		let result = '';
		let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

	public addProduct() {
		for (let i = 0; i < this.imageInput.nativeElement.files.length; i++) {
			const file = this.imageInput.nativeElement.files[i];
			const filePath = `image-${this.createRandomString(15)}`;
			const task = this.storage.upload(filePath, file);
			this.imagesNamesArr.push(filePath);

			task.percentageChanges().subscribe(this.calcPercentage);
		}
		this.imagesNamesArr = JSON.stringify(this.imagesNamesArr);

		let checkbox: any = document.getElementsByClassName('checkbox');
		let selectedCategoriesHTML: any = document.querySelector('#selectedCategories');
		let selectedCategories = [];

		for (let i = 0; i < checkbox.length; i++) {
			if (checkbox[i].checked) {
				selectedCategories.push(JSON.parse(checkbox[i].value));
			}
		}
		selectedCategoriesHTML.value = selectedCategories;

		this._http.postProduct(this.nameInput.nativeElement.value, this.priceInput.nativeElement.value, this.descriptionInput.nativeElement.value, selectedCategories, this.imagesNamesArr);

		M.toast({ html: 'Added to database' });
	};

	private calcPercentage(percentage) {
		const preloaderEl: any = document.querySelector('#preloaderElement');
		preloaderEl.style.width = percentage + '%';
	}
}
