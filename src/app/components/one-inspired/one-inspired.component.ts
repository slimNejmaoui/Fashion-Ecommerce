import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-one-inspired',
  templateUrl: './one-inspired.component.html',
  styleUrls: ['./one-inspired.component.css']
})
export class OneInspiredComponent implements OnInit {
  @Input() oneProduct: any;

  // userIsAuthenticated = false;
  // private authListenerSubs: Subscription;
  // user: any;
  // id: string;

  constructor(private route: Router, private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {



    // this.userIsAuthenticated = this.userService.getIsAuth();
    // console.log('here auth', this.userIsAuthenticated);
    // this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(isAuthenticated => {
    //   this.userIsAuthenticated = isAuthenticated;


    // });

  }


  gotoDisplay(id: any) {

    this.route.navigate([`displayProduct/${id}`]);
  }



  color(a: number) {
    if (a > 20 && a < 120) {
      return "1";

    }
    else if (a >= 130 && a < 300) {
      return "2";
    }
    else {

      return "3";
    }


  }

}
