import { Component, OnInit } from '@angular/core';
import { BookmarksService } from '../../services/bookmarks.service';
import { Repository } from '../../models/repository';

@Component({
    selector: 'app-bookmarks',
    templateUrl: './bookmarks.component.html',
    styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {

    public bookmarks: Repository[];

    constructor(private bookmarksService: BookmarksService) { }

    ngOnInit() {
        this.getBookmarks();
        console.log(this.bookmarks);
    }

    public getBookmarks(): void {
        this.bookmarksService.getBookmarks()
            .then(retrievedData =>{
                console.log(retrievedData);
                // if(!retrievedData) throw new Error("Bookmarks is empty!");
                // this.bookmarks = retrievedData;
                // console.log(retrievedData);
            })
            .catch(reason =>
                console.log(reason));
    }

    // public removeFromBookmarks(id: number): void {
    //     this.bookmarksService
    //         .addBookmark(this.bookmarks[id])
    //         .subscribe(result =>
    //             console.log(result.stringify),
    //             err =>
    //                 console.error(err));
    //     this.getBookmarks();
    // }
}
