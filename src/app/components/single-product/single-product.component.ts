import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  @Input() SingleInput: any;
  responsiveOptions: { breakpoint: string; numVisible: number; numScroll: number; }[];



  constructor() {
    this.responsiveOptions = [{
      breakpoint: '1024px',
      numVisible: 1,
      numScroll: 3
    }];
  }

  ngOnInit() {
  }

}
