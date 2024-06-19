import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

const url = 'https://api.themoviedb.org/3';
const options = {
  params: {
    include_adults: 'false',
    include_video: 'true',
    language: 'en-US',
    page: '1',
    sort_by: 'popularity.desc'
  },
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDYyNmNhYjQ1ZjNjNTgwZjNmNzc4NGJhMGY1MTU3MCIsInN1YiI6IjY2NmU5MDJkMmQwNDc1OTRlMzZiYzBjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LaaXQU24Rctk_cdwqy6uK0uWNxOd5ydqKSay4pqPRFE'
  }
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  http = inject(HttpClient)

  constructor() { }

  getMovies(){
    return this.http.get<any>(`${url}/discover/movie`,options)
  }

  getTvShows() {
    return this.http.get(`${url}/discover/tv`, options)
  }

  getRatedMovies() {
    return this.http.get(`${url}/guest_session/guest_session_id/rated/movies`, options)
  }

  getBannerImage(id: number) {
    return this.http.get(`${url}/movie/${id}/images`, options)
  }

  getBannerVideo(id: number) {
    return this.http.get(`${url}/movie/${id}/videos`, options);
  }

  getBannerDetail(id: number) {
    return this.http.get(`${url}/movie/${id}`, options);
  }

  getNowPlayingMovies() {
    return this.http.get(`${url}/movie/now_playing`, options)
  }

  getPopularMovies() {
    return this.http.get(`${url}/movie/popular`, options)
  }

  getTopRated() {
    return this.http.get(`${url}/movie/top_rated`, options)
  }

  getUpcomingMovies() {
    return this.http.get(`${url}/movie/upcoming`, options)
  }

}
