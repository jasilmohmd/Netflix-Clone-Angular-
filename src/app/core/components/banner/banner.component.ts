import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DescriptionPipe } from '../../../shared/pipes/description.pipe';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [DescriptionPipe],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent implements OnChanges {
  
  @Input({required: true}) bannerTitle = "";
  @Input() bannerOverview = "";
  @Input() key = "_OKAwz2MsJs";

  videoUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0`);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['key']){
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`http://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0`);
    }
  }

}
