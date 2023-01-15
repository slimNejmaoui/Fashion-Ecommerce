import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-featured-product',
  templateUrl: './featured-product.component.html',
  styleUrls: ['./featured-product.component.css']
})
export class FeaturedProductComponent implements OnInit {
  T: any = [];
  pageOfItems: Array<any>;




  constructor(private productServices: ProductService) {

  }

  ngOnInit() {
    this.productServices.getALLProducts().subscribe(
      (response) => {
        this.T = response.Products;
      }
    )


  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

}
