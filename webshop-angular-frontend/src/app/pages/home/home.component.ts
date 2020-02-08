import { Component, OnInit, Output } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    @Output() public products: Array<Object>;

    constructor(private _http: HttpService) { }

    ngOnInit() {
        this._http.getFrontPageProducts().subscribe(
            this._onProductsLoaded.bind(this),
            this._onProductsLoadFailed.bind(this));
    }

    private _onProductsLoaded(data: any): void {
        this.products = data;
    }

    private _onProductsLoadFailed(error: any): void {
        console.log(error);
    }
}
