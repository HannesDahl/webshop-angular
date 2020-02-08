import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private http: HttpClient) { }

    getFrontPageProducts() {
        return this.http.get(environment.serverUrl + '/products');
    }

    getCategoryProducts($event) {
        return this.http.get(environment.serverUrl + '/c/' + $event);
    }

    getPageProduct($event) {
        return this.http.get(environment.serverUrl + '/p/' + $event);
    }

}
