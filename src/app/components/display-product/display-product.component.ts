import { Component, OnInit, TrackByFunction } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandesService } from 'src/app/services/commandes.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-display-product',
  template: `
  <button
    class="btn btn-outline-secondary"
    mwlConfirmationPopover
    [popoverTitle]="popoverTitle"
    [popoverMessage]="popoverMessage"
    (confirm)="confirmClicked = true"
    (cancel)="cancelClicked = true"
  >
    Click me!
  </button>
`,
  templateUrl: './display-product.component.html',
  styleUrls: ['./display-product.component.css']
})
export class DisplayProductComponent implements OnInit {

  product: any;
  id: any;
  placements = ['confirmation'];
  popoverTitle = 'Are you sure?';
  popoverMessage = 'Are you really <b>sure</b> you want to do this?';
  confirmText = 'Yes ';
  cancelText = 'No ';
  confirmClicked = false;
  cancelClicked = false;
  trackByValue: TrackByFunction<string> = (index, value) => value;


  commandeForm: FormGroup

  userId: string;
  fullDate: string;
  productId: any;
  clientId: any;
  description: any;
  price: any;
  statut = ['store']
  quantity: string;
  msg: string;
  Quantity: string;

  constructor(private activatedRoute: ActivatedRoute,
    private productServices: ProductService,
    private route: Router, private formbuilder: FormBuilder,
    private commandeServices: CommandesService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');


    this.productServices.displayProduct(this.id).subscribe((response) => {

      this.product = response.Product
    })

    this.commandeForm = this.formbuilder.group({


      quantity: ['', [Validators.required, Validators.min(1)]],

    })
  }


  AddCommande() {

    this.clientId = localStorage.getItem("userId")
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');


    var d = new Date();
    var date = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
    var hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    this.fullDate = date + ' ' + hours;
    console.log(this.fullDate);
    this.commandeForm.value.clientId = this.clientId;
    this.commandeForm.value.productId = this.productId;
    this.commandeForm.value.storeId = this.product.userId;

    console.log("here commande", this.commandeForm.value);


    this.commandeForm.value.date = this.fullDate;
    console.log("here date", this.commandeForm.value.date)
    this.commandeServices.addCommande(this.commandeForm.value).subscribe((response) => {
      console.log("here response is", response.message);


      if (response.message == "quantity insuffisante") {
        this.msg = response.message;
        console.log("response", this.msg);

        this.Quantity = `il  reste ${response.resultQuantity.quantity} article`
      }
    });









  }

  color(a: number) {
    if (a > 20 && a < 120) {
      return "1";

    }
    else if (a >= 121 && a < 300) {
      return "2";
    }
    else {

      return "3";
    }


  }

}
