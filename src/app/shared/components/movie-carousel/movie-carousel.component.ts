import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { IVideoContent } from '../../model/video-content.interface';
import { DescriptionPipe } from '../../pipes/description.pipe';
import { ImagePipe } from '../../pipes/image.pipe';
import { animate, style, transition, trigger } from '@angular/animations';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-movie-carousel',
  standalone: true,
  imports: [CommonModule,DescriptionPipe,ImagePipe],
  templateUrl: './movie-carousel.component.html',
  styleUrl: './movie-carousel.component.css',
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class MovieCarouselComponent implements  AfterViewInit {

  selectedContent: string | null = null;

  @Input() videoContents: IVideoContent[] = [];
  @Input() title!: string


  @ViewChild('swiperContainer') swiperContainer!: ElementRef

  swiperOptions: SwiperOptions = {
    slidesPerView: 3,
    slidesPerGroup: 2,
    centeredSlides: true,
    loop: true,
    breakpoints: {
      600: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        centeredSlides: true,
        spaceBetween: 5
      },
      900: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 5,
        centeredSlides: true,
      },
      1200: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 5,
        centeredSlides: false,
      },
      1500: {
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 5,
        centeredSlides: false,
      },
      1800: {
        slidesPerView: 5,
        slidesPerGroup: 6,
        spaceBetween: 5,
        centeredSlides: false,
      }
    }
  }

  constructor() {}
  
  ngAfterViewInit(): void {
    try {
      this.initSwiper();
    } catch (error) {
      console.error('Error initializing Swiper:', error);
    }    
  }



  private initSwiper() {
    if (this.swiperContainer && this.swiperContainer.nativeElement) {
      new Swiper(this.swiperContainer.nativeElement, this.swiperOptions);
    } else {
      console.error('Swiper container element not found');
    }
  }

  setHoverMovie(movie:IVideoContent){
    this.selectedContent = movie.title ?? movie.name;
  }

  clearHoverMovie(){
    this.selectedContent = null;
  }

}
