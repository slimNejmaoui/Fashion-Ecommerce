import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  term: ["Homme", "Femme", "Enfant"]
  T: any = [];
  categorie: any;

  pageOfItems: Array<any>;


  constructor(private productServices: ProductService) { }

  ngOnInit() {

    this.productServices.getALLProducts().subscribe(
      (response) => {
        this.T = response.Products;
      }
    )
  }


  onSelect(event) {

    this.categorie = event.target.value;

  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

}
