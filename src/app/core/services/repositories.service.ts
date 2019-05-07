import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchResults } from '../models/search-rusults';
import { Repository, Owner } from '../models/repository';

@Injectable({
    providedIn: 'root'
})
export class RepositoriesService {

    constructor(private httpClient: HttpClient) { }

    public getResults(searchString: string): Promise<SearchResults> {
        return this.httpClient
            .get<SearchResults>("https://api.github.com/search/repositories?q=" + searchString)
            .toPromise()
            .then(res =>  // mapping out only what I need from Json.
                new SearchResults(
                    res.total_count,
                    res.incomplete_results,
                    res.items.map(item =>
                        new Repository(
                            item.id,
                            item.name,
                            new Owner(
                                item.owner.id,
                                item.owner.avatar_url
                            ))
                    ))
            );
    }
}
