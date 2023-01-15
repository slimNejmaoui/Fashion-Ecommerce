import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-producst-tab',
  templateUrl: './producst-tab.component.html',
  styleUrls: ['./producst-tab.component.css']
})
export class ProducstTabComponent implements OnInit {
  T: any;
  pageOfItems: Array<any>;

  constructor(private productServices: ProductService, private route: Router) { }

  ngOnInit() {

    this.productServices.getALLProducts().subscribe(
      (response) => {
        this.T = response.Products;
      }
    )
  }

  gotoDisplay(id: any) {

    this.route.navigate([`displayProduct/${id}`]);
  }

  gotoEdit(id: any) {


    this.route.navigate([`editProduct/${id}`]);
  }

  deleteMatch(id) {

    this.productServices.deleteProduct(id).subscribe((response) => {
      console.log("here reponse after delete match", response.message);
      this.productServices.getALLProducts().subscribe(
        (response) => {
          this.T = response.Products;
        }
      )
    })


  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }


}
