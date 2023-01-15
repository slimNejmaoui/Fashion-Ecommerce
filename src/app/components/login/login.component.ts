import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: any = {};
  errorMsg: string;


  constructor(private route: Router, private auth: AuthService) { }

  ngOnInit() {
  }

  // login() {


  //   this.userService.login(this.user).subscribe((response) => {

  //     if (response.message == "2") {

  //       localStorage.setItem("connected", response.user.userId)
  //       localStorage.setItem("role", response.user.userRole)
  //       localStorage.setItem("token", response.user.token)
  //       console.log("connected");

  //       if (response.user.userRole == "admin") {
  //         this.route.navigate(['dashboard']);
  //       } else if (response.user.userRole == "store") {

  //         this.route.navigate(['add-products']);

  //       }
  //       else {
  //         this.route.navigate(['home']);

  //       }

  //     } else {
  //       this.errorMsg = "Please check Email/Pwd";
  //     }

  //   })


  // }

  userObj() {



    this.route.navigate(["registre"]);



  }


  login() {

    this.auth.login(this.user.email, this.user.pwd).subscribe((response) => {
      console.log("res", response);


      if (!response) {

        this.errorMsg = "Login failed. Check the user name and password";

      }


    })


  }


}
