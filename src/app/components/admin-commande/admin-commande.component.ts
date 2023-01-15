import { Component, OnInit } from '@angular/core';
import { CommandesService } from 'src/app/services/commandes.service';

@Component({
  selector: 'app-admin-commande',
  templateUrl: './admin-commande.component.html',
  styleUrls: ['./admin-commande.component.css']
})
export class AdminCommandeComponent implements OnInit {
  C: any;

  constructor(private commandeServices: CommandesService) { }

  ngOnInit() {

    this.commandeServices.gettAllCommandes().subscribe(
      (response) => {
        this.C = response.order;
      }
    )
  }

  deleteProduct(id) {

    this.commandeServices.deleteProduct(id).subscribe((response) => {
      console.log("here reponse after delete match", response.message);
      this.commandeServices.gettAllCommandes().subscribe((response) => {
        this.C = response.order
      })
    })


  }

}
