import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ScrollService } from 'src/app/shared/services/scroll.service';

@Component({
  selector: 'about-section',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public sideInfoExpanded = false;

  constructor(
    private readonly scrollService: ScrollService,
  ) {
  }

  ngOnInit(): void {
    this.toggleExpanded(true);
  }

  public toggleExpanded(reset = false) {
    if (reset) {
      this.sideInfoExpanded = false;
    }
    else {
      if(this.sideInfoExpanded) {
        this.scrollService.scrollToElement('about');
      }
      else {
        this.scrollService.scrollToElement('text-section', false);
      }
      this.sideInfoExpanded = !this.sideInfoExpanded;
    }
  }

  public styleSideInfo() {
    return { 'height': (this.sideInfoExpanded ? '100%' : '0'), 'opacity': (this.sideInfoExpanded ? '1' : '0') };
  }
}
