import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Repository, Owner } from '../models/repository';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BookmarksService {

    private readonly apiServer: string = "http://localhost:53727/bookmarks/";

    constructor(private httpClient: HttpClient) { }

    public getBookmarks(): Promise<Repository[]> {
        return this.httpClient.get<any>(this.apiServer + "get")
            .toPromise()
            .then(data=>{
                console.log(data)
                return JSON.parse(data)
            });
    }

    public addBookmark2(repository: Repository): Promise<any> {
        console.log(JSON.stringify(repository));
        return this.httpClient.get<any>(this.apiServer + "add?item=" + encodeURI(JSON.stringify(repository)))
            .toPromise()
            .then();
    }

    public addBookmark(repository: Repository): Observable<any> {
        return this.httpClient.get<any>(this.apiServer + "add?item=" + JSON.stringify(repository));
    }
}
