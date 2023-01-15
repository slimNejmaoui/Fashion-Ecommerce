import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productForm: FormGroup;
  id: string;
  product: any;
  imagePreview: string;

  constructor(private formbuilder: FormBuilder, private productServices: ProductService, private activatedRoute: ActivatedRoute,
    private route: Router,) { }

  ngOnInit() {

    this.productForm = this.formbuilder.group({

      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      categorie: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      price: ['', [Validators.required, Validators.min(1)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      img: ['']
    })

    this.id = this.activatedRoute.snapshot.paramMap.get('id');


    this.productServices.displayProduct(this.id).subscribe((response) => {

      this.product = response.Product
    })
  }


  editProduct() {

    this.productServices.editProduct(this.product).subscribe((response) => {
      console.log("here this a new  object", response.message);

    })
    this.route.navigate(['dashboard']);


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


