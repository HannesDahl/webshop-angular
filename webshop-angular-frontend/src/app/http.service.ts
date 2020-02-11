import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private http: HttpClient) { }

    getFrontPageProducts() {
        return this.http.get(environment.serverUrl + '/frontproducts');
    }

    getRandomProducts() {
        return this.http.get(environment.serverUrl + '/randomproducts');
    }

    getSearchProducts($event) {
        return this.http.get(environment.serverUrl + '/search/' + $event);
    }

    getCategoryProducts($event) {
        return this.http.get(environment.serverUrl + '/category/' + $event);
    }

    getPageProduct($event) {
        return this.http.get(environment.serverUrl + '/product/' + $event);
    }

}
