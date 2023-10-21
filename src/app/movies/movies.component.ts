import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MovieServiceService } from './movieService/movie-service.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, debounce, interval, map, of, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CardDialogComponent } from './card-dialog/card-dialog.component';
import { FormControl } from '@angular/forms';

export interface Card {
  title: string;
  description: string;
  genres: string;
}
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly movieService: MovieServiceService,
    public dialog: MatDialog
    ) {
     }
     search_word = new FormControl();
     cards: any = [];
      filteredCards: any = []
     next = '';
     previous = '';
     pageSize = 10;
     pageIndex = 0;
     totalItems = 0;
     image: any;
     showRefresh: any;
     searchText: any;
     result_list: any;
    
    ngOnInit(): any {
      this.getMovies('');
        this.filteredCards.forEach((card: any) => {
          card.url = `https://ui-avatars.com/api/?name=${card.title}`;
      });
      this.search_word.valueChanges.pipe(
        debounce(() => interval(250)),
        switchMap(value => this.search(value))
      ).subscribe(res => {
        this.result_list = res;
      },
      err => {
        console.error(err.error);
      });

      
    }

    search(keyword: string): Observable<any> {
      console.log(keyword);
      var result= this.cards.filter((element: any)=>{
        return element.title.toLowerCase()== element.toLowerCase();
      });
      return of(result)
    }


  getMovies(url?: any): any {
    this.movieService.getMovies(url).subscribe((response: any) => {
      console.log(response)
      this.showRefresh = false;
      this.cards = response.results;
      this.filteredCards = response.results;
      this.filteredCards.forEach((card: any) => {
        card.url = `https://ui-avatars.com/api/?name=${card.title}`;
    });
    console.log(this.filteredCards)
      this.next = response.next;
      this.previous = response.previous
      this.totalItems = response.count
    }, (error: any) => {
      this.showRefresh = true;
    });
  }

  onPageChange(event: PageEvent): any {
    console.log(event)
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    if(event.pageIndex == 0 && event.previousPageIndex == 0) {
      this.getMovies(this.next);
    }

    if (event.pageIndex) {
      this.getMovies(this.next);
    } else if (event.previousPageIndex) {
      this.getMovies(this.previous);
    }
  }
  onRefresh(): any {
    this.getMovies('');
  }
  openDialog(card: any): any {
    console.log(card)
    const dialogRef = this.dialog.open(CardDialogComponent, {
      data: card,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  onSearch(event: any) {
    let value = event.target.value
    if (value.length > 3) {
      this.filteredCards = this.cards.filter((element: any)=>{
        return element.title.toLowerCase().includes(value.toLowerCase());
      });
      console.log(this.filteredCards)
    } else {
      this.filteredCards = this.cards;
    }
  }
}
