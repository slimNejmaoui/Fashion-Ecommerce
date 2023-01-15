import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandesService } from 'src/app/services/commandes.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-client-tab',
  templateUrl: './client-tab.component.html',
  styleUrls: ['./client-tab.component.css']
})
export class ClientTabComponent implements OnInit {
  C: any;
  id: any;
  product: any;


  constructor(private commandeServices: CommandesService, private activatedRoute: ActivatedRoute, private route: Router, private productServices: ProductService,) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.commandeServices.getById_commandeClient(this.id).subscribe((response) => {
      this.C = response.commandeClient

      console.log("commande", response.commandeClient);

    })

    this.id = this.activatedRoute.snapshot.paramMap.get('id');


    this.productServices.displayProduct(this.id).subscribe((response) => {

      this.product = response.Product
    })
  }


  gotoDisplay(id: any) {

    this.route.navigate([`displayProduct/${id}`]);

  }

  deleteProduct(id) {

    this.commandeServices.deleteProduct(id).subscribe((response) => {
      console.log("here reponse after delete match", response.message);
      this.commandeServices.getById_commandeClient(this.id).subscribe((response) => {
        this.C = response.commandeClient
      })
    })


  }
}
