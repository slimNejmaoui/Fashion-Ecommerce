import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  id: any;
  user: any = {};
  signupForm: FormGroup;
  path: any;
  imagePreview: string;

  constructor(private activatedRoute: ActivatedRoute,
    private route: Router,
    private usersService: UserService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.path = this.route.url;
    if (this.path == "/registre-admin") {
      this.signupForm = this.formBuilder.group({

        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.email, Validators.required, Validators.pattern("[a-z0-9._%+-]+@[admin]+\.[com]{3,4}$")]],
        pwd: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12), Validators.pattern("^[a-z0-9_-]{8,15}$")]],
        ConfirmePwd: [''],
        img: ['']
      })

    } else {

      this.signupForm = this.formBuilder.group({

        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.email, Validators.required, Validators.pattern("[a-z0-9._%+-]+@[admin]+\.[a-z]{2,4}$")]],
        pwd: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12), Validators.pattern("^[a-z0-9_-]{8,15}$")]],
        ConfirmePwd: [''],
        img: [''],
        statut: ['nonOk']
      })

    }

    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.usersService.getUser(this.id).subscribe((response) => {

      this.user = response.user;
    })
  }

  editUser() {


    this.usersService.editUser(this.user).subscribe((response) => {
      console.log("here this a new  object", response.message);

    })

    this.route.navigate(['dashboard']);

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



