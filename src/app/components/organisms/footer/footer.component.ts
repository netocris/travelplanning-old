import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent extends BaseComponent {
  
  year: number = 1800;

  constructor(@Inject(DOCUMENT) private document: Document) {
    super();
  }

  protected ngOnInitCustom(): void {
    this.year = new Date().getFullYear();
  }

  onChange(value: any): void {
    console.log(value.target.checked);
    if(value.target.checked){
      this.trans();
      this.document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      this.trans();
      this.document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  private trans(): void {
    this.document.documentElement.classList.add('transition');
      window.setTimeout(() => {
        this.document.documentElement.classList.remove('transition');
      }, 1000);
  }

}
