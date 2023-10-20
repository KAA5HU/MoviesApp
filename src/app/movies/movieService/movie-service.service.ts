import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  url: any = "https://demo.credy.in/api/v1/maya/movies/";
  imageURL: any = "https://ui-avatars.com/api/?name=John+Doe";

  constructor(private http: HttpClient) { }
  getMovies(url: any): Observable<any> {
    if (url == '') {
      url = this.url;
    }
    return this.http.get(url);
  }
  getAvatar(url: any): Observable<any> {
    if (url == '') {
      url = this.imageURL;
    }
    return this.http.get(url)
  }
}
