import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandesService } from '../services/commandes.service';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-store-commande-tab',
  templateUrl: './store-commande-tab.component.html',
  styleUrls: ['./store-commande-tab.component.css']
})
export class StoreCommandeTabComponent implements OnInit {
  id: string;
  V: any;

  constructor(private activatedRoute: ActivatedRoute, private commandeServices: CommandesService, private route: Router, private storServices: StoreService) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.commandeServices.getById_StoreCommande(this.id).subscribe((response) => {
      this.V = response.storeCommande
    })
  }

  deleteProduct(id) {

    this.storServices.delete_ProductStore(id).subscribe((response) => {
      console.log("here reponse after delete match", response.message);
      this.commandeServices.getById_StoreCommande(this.id).subscribe((response) => {
        this.V = response.storeCommande
      })
    })


  }

}
