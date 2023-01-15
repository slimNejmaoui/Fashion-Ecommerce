import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-inspired-products',
  templateUrl: './inspired-products.component.html',
  styleUrls: ['./inspired-products.component.css']
})
export class InspiredProductsComponent implements OnInit {
  T: any = [];
  pageOfItems: Array<any>;

  constructor(private productServices: ProductService) { }

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
