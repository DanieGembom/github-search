import { Component, OnInit } from '@angular/core';
import { RepositoriesService } from '../../services/repositories.service';
import { SearchResults } from '../../models/search-rusults';
import { ActivatedRoute, Router } from '@angular/router';
import { Repository } from '../../models/repository';
import { BookmarksService } from '../../services/bookmarks.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

    public nextButtonDisabled: boolean;
    public previousButtonDisabled: boolean;
    public currentPage: number = 1;
    public totalPages: number = 1;
    public searchResults: SearchResults;
    public bookmarks: Repository[];

    public constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router, private repositoriesService: RepositoriesService,
        private bookmarksService: BookmarksService) { }

    ngOnInit() {  // In case of parametered url (like when user saved search results in browser's favorites)
        let params: string = this.activatedRoute.snapshot.queryParams["q"];
        if (params !== undefined) {
            this.currentPage = parseInt(params.slice(params.lastIndexOf("=") + 1)); //updating current number of page.
            this.performSearch(params);
        }
        this.getBookmarks();
    }

    public newSearch(searchText: string): void {  // In case function invoked by button
        if (!searchText.trim()) return;
        this.currentPage = 1;
        this.performSearch(searchText + "&page=" + this.currentPage);
    }

    private performSearch(queryString: string): void { // Main search method
        document.getElementById("pleaseWait").hidden = false;
        document.getElementById("errorMessage").hidden = true;
        this.repositoriesService.getResults(queryString)    // Calling Promise service asynchronically.
            .then(
                retrievedData => {      // this properties update must be synch before buttons re-enabling.
                    this.searchResults = retrievedData;
                    //  etrievedData.items.forEach((repos,i)=>{
                    //  this.searchResults.items[i].name = repos.name;
                    //  this.searchResults.items[i].id = repos.id;
                    //  this.searchResults.items[i].owner.avatar_url = repos.owner.avatar_url;
                    //  this.searchResults.items[i].owner.id = repos.owner.id;
                    //});
                    this.searchResults.total_count = retrievedData.total_count;
                    this.totalPages = Math.ceil(this.searchResults.total_count / 30);
                    this.previousButtonDisabled = this.currentPage == 1;
                    this.nextButtonDisabled = this.currentPage * 30 >= this.searchResults.total_count;
                    document.getElementById("pleaseWait").hidden = true;
                })
            .catch(
                reason => {
                    // console.log(reason);
                    document.getElementById("errorMessage").hidden = false;
                    this.router.navigate([], { // Removing queryString from url to make new search possible after refreshing.
                        relativeTo: this.activatedRoute,
                        queryParams: {}
                    });
                }
            );
        this.router.navigate([], {                          // Updating url route with new queryString
            relativeTo: this.activatedRoute,
            queryParams: { q: queryString }
        });
    }

    public nextPage(): void {
        this.nextButtonDisabled = true;       // Prevents clicking again before promise succeed.
        this.previousButtonDisabled = true;
        this.currentPage++;                   // (below) Extracts & sends searchText from url line
        this.performSearch(this.activatedRoute.snapshot.queryParams['q'].split('&')[0] + "&page=" + this.currentPage);
    }

    public previousPage(): void {
        this.nextButtonDisabled = true;
        this.previousButtonDisabled = true;
        this.currentPage--;
        this.performSearch(this.activatedRoute.snapshot.queryParams['q'].split('&')[0] + "&page=" + this.currentPage)
    }

    public getBookmarks(): void {
        this.bookmarksService.getBookmarks()
            .then(retrievedData =>{
                if(!retrievedData) throw new Error("Bookmarks is empty!")
                this.bookmarks = retrievedData})
            .catch(reason =>
                console.log(reason));
    }

public addToBookmarks(id:number):void{
    this.bookmarksService
    .addBookmark2(this.searchResults.items[id])
    .then(success=>{
        console.log(success);
        this.getBookmarks();
        console.log(id+"");
        console.log(this.searchResults.items[0].name);
        console.log(this.bookmarks);
    })
    .catch(reason=>console.log(reason));
}

    public addToBookmarks2(id: number): void {
        this.bookmarksService
        .addBookmark(this.searchResults.items[id])
        .subscribe();
        this.getBookmarks();
    }
}
