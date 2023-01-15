import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-product',

  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup
  imagePreview: string;
  userId: string;
  fullDate: string;
  users: any;
  statut: string;


  constructor(private formbuilder: FormBuilder, private productsServices: ProductService, private route: Router, private usersService: UserService) { }

  ngOnInit() {



    this.userId = localStorage.getItem("userId")

    this.productForm = this.formbuilder.group({

      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      categorie: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      img: ['']
    })
    this.usersService.getAllUsers().subscribe((response) => { this.users = response.users });

  }





  // addProduct() {

  //   this.statut = localStorage.getItem("statut");




  //   var d = new Date();
  //   var date = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
  //   var hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  //   this.fullDate = date + ' ' + hours;
  //   console.log(this.fullDate);
  //   this.productForm.value.userId = this.userId;
  //   console.log("here product", this.productForm.value);
  //   this.productForm.value.date = this.fullDate;
  //   this.productForm.value.statut = this.statut;

  //   console.log("here date", this.productForm.value.date)
  //   console.log("here date", this.productForm.value.date)

  //   if (this.productForm.value.statut == 'Active') {
  //     this.productsServices.addProduct(this.productForm.value, this.productForm.value.img).subscribe((response) => {
  //       console.log("here response add prod", response.message);

  //     })
  //     this.route.navigate(['']);
  //   }
  //   else {
  //     alert('problem')
  //   }

  // }










  // this.productsServices.addProduct(this.productForm.value, this.productForm.value.img).subscribe((response) => {
  //   console.log("here response after addproducts", response.message);


  // })

  addProduct() {
    var d = new Date();
    var date = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
    var hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    this.fullDate = date + ' ' + hours;
    console.log(this.fullDate);
    this.productForm.value.userId = this.userId;
    console.log("here product", this.productForm.value);
    this.productForm.value.date = this.fullDate;
    console.log("here date", this.productForm.value.date)
    this.productsServices.addProduct(this.productForm.value, this.productForm.value.img).subscribe((response) => {
      console.log("here response after add annonce", response.message);
      if (response.message == 'not access') {
        alert(response.message);
      } else { this.route.navigate(['']); }

    });

  }






  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.productForm.patchValue({ img: file });
    this.productForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }

}
