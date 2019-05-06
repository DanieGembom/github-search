import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Repository } from '../models/repository';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BookmarksService {

    private readonly apiServer: string = "http://localhost:53727/bookmarks/";

    constructor(private httpClient: HttpClient) { }

    public getBookmarks(): Promise<any> {
        return this.httpClient.get<any>(this.apiServer + "get")
            .toPromise()
            .then();
    }

    public addBookmark(repository: Repository):Observable<any>{
        return this.httpClient.get<any>(this.apiServer + "add?item=" + JSON.stringify(repository));
    }
}
