import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup
  path: string;

  errorMsg: string;



  imagePreview: any;
  constructor(private formBuilder: FormBuilder, private route: Router, private userService: UserService) { }

  ngOnInit() {
    this.path = this.route.url;
    if (this.path == "/registre-admin") {
      this.signupForm = this.formBuilder.group({

        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.email, Validators.required, Validators.pattern("[a-z0-9._%+-]+@[admin]+\.[com]{3,4}$")]],
        pwd: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12), Validators.pattern("^[a-z0-9_-]{8,15}$")]],
        ConfirmePwd: [''],
        img: [''],
        statut: ['Active']

      })

    } else {

      this.signupForm = this.formBuilder.group({

        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.email, Validators.required]],
        pwd: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12), Validators.pattern("^[a-z0-9_-]{8,15}$")]],
        ConfirmePwd: [''],
        img: [''],
        statut: ['NonActive']
      })

    }
  }


  signup() {

    if (this.path == "/registre") {
      this.signupForm.value.role = "client";

    } else if (this.path == "/registre-store") {

      this.signupForm.value.role = "store";
    } else {
      this.signupForm.value.role = "admin";

    }


    // console.log("her user object", this.signupForm.value);

    this.userService.signup(this.signupForm.value, this.signupForm.value.img).subscribe((response) => {
      console.log("here response after signup", response.message);

      if (response.message == "email existe") {

        this.errorMsg = response.message
      } else {

        this.route.navigate(['login']);
      }




    })

  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({ img: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }

}
