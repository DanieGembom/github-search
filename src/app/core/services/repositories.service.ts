import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchResults } from '../models/search-rusults';

@Injectable({
    providedIn: 'root'
})
export class RepositoriesService {

    constructor(private httpClient: HttpClient) { }

    public getResults(searchString: string): Promise<SearchResults> {
        return this.httpClient
            .get<SearchResults>("https://api.github.com/search/repositories?q=" + searchString)
            .toPromise()
            .then();
    }
}
