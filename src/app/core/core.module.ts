import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { SearchComponent } from './components/search/search.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { MenuComponent } from './components/menu/menu.component';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { MainComponent } from './components/main/main.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
    { path: "search", component: SearchComponent },
    { path: "search/:q", component: SearchComponent },
    { path: "bookmarks", component: BookmarksComponent },
    { path: "about", component: AboutComponent },
    { path: "", redirectTo: "search", pathMatch: "full" }
];

@NgModule({
    declarations: [
        LayoutComponent,
        HeaderComponent,
        MainComponent,
        FooterComponent,
        GalleryComponent,
        BookmarksComponent,
        SearchComponent,
        MenuComponent,
        AboutComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule,
        LayoutComponent
    ]
})
export class CoreModule { }
