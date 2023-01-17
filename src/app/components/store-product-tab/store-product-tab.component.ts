import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-store-product-tab',
  templateUrl: './store-product-tab.component.html',
  styleUrls: ['./store-product-tab.component.css']
})
export class StoreProductTabComponent implements OnInit {
  id: string;
  P: any;
  product: any;

  constructor(private activatedRoute: ActivatedRoute, private storServices: StoreService, private route: Router, private productServices: ProductService) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.storServices.getById_StoreProduct(this.id).subscribe((response) => {
      this.P = response.storeProduct
    })


  }

  gotoDisplay(id: any) {

    this.route.navigate([`displayProduct/${id}`]);
  }

  gotoEdit(id: any) {


    this.route.navigate([`editProduct/${id}`]);
  }
  deleteProduct(id) {

    this.productServices.deleteProduct(id).subscribe((response) => {
      console.log("here reponse after delete match", response.message);
      this.storServices.getById_StoreProduct(this.id).subscribe((response) => {
        this.P = response.storeProduct
      })
    })


  }

}
