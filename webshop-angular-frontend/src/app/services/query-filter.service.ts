import { Injectable } from '@angular/core';
declare var require: any;
const queryString = require('query-string');

@Injectable({
    providedIn: 'root'
})
export class QueryFilterService {

    constructor() { }

    public handleQueryParams = (query, newQuery) => {
        var parsed = queryString.parse(query);
        newQuery = newQuery.split('=');
        let key = newQuery[0];
        let value = newQuery[1];
        parsed[key] = value
        let txt = '?'
        txt += queryString.stringify(parsed);
        return txt
    }

    public removeQueryParam = (query, queryToDel) => {
        var parsed = queryString.parse(query);
        delete parsed[queryToDel];
        let txt = '?';
        txt += queryString.stringify(parsed);
        return txt;
    }
}
