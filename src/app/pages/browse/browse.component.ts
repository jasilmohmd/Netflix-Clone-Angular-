import { Component, OnInit, inject } from '@angular/core';
import { MoviesService } from '../../shared/services/movies.service';
import { CommonModule } from '@angular/common';
import { MovieCarouselComponent } from '../../shared/components/movie-carousel/movie-carousel.component';
import { IVideoContent } from '../../shared/model/video-content.interface';
import { Observable, forkJoin, map, tap } from 'rxjs';
import { HeaderComponent } from '../../core/components/header/header.component';
import { BannerComponent } from '../../core/components/banner/banner.component';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule, MovieCarouselComponent,HeaderComponent,BannerComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
export class BrowseComponent implements OnInit {

  movieService = inject(MoviesService);

  bannerDetials$ = new Observable<any>();
  bannerVideo$ = new Observable<any>();

  movies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  nowPlayingMovies: IVideoContent[] = [];
  popularMovies: IVideoContent[] = [];
  topRatedMovies: IVideoContent[] = [];
  upcomingMovies: IVideoContent[] = [];

  sources = [
    this.movieService.getMovies(),
    this.movieService.getTvShows(),
    this.movieService.getNowPlayingMovies(),
    this.movieService.getUpcomingMovies(),
    this.movieService.getPopularMovies(),
    this.movieService.getTopRated()
  ]

  ngOnInit(): void {

    forkJoin(this.sources)
      .pipe(
        map(([movies, tvShows, nowPlaying, upcoming, popular, topRated]) => {
          
          this.bannerDetials$ = this.movieService.getBannerDetail(movies.results[12].id)
          //  .pipe(
          //     tap( bannerDetails => console.log('Banner Details:', bannerDetails)) // Log the data from the observable
          //   );
          this.bannerVideo$ = this.movieService.getBannerVideo(movies.results[12].id);
          
          return { movies, tvShows, nowPlaying, upcoming, popular, topRated }

        })
      ).subscribe((res) => {
        this.movies = res.movies.results as IVideoContent[];
        this.tvShows = res.tvShows.results as IVideoContent[];
        this.nowPlayingMovies = res.nowPlaying.results as IVideoContent[];
        this.upcomingMovies = res.upcoming.results as IVideoContent[];
        this.popularMovies = res.popular.results as IVideoContent[];
        this.topRatedMovies = res.topRated.results as IVideoContent[];
        
        // this.bannerDetials$.subscribe({
        //   next: (bannerDetails) => {
        //     console.log('Banner Title:', bannerDetails.original_title);
        //     console.log('Banner Details:', bannerDetails.over);
        //   },
        //   error: (err) => {
        //     console.error('Error fetching banner details:', err);
        //   }
        // });

      })
    
  }
  

}
