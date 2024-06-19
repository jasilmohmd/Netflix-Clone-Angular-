import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent implements OnChanges {
  
  @Input({required: true}) bannerTitle = "";
  @Input() bannerOverview = "";
  @Input() key = "xSeavZfiO0s";

  videoUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=0&controls=0`);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['key']){
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`http://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=0&controls=0`);
    }
  }

}
