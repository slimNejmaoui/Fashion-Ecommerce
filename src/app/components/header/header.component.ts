import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userIsAuthenticated = false;
  clientIsAuthenticated: any;
  storeIsAuthenticated: any;
  adminIsAuthenticated: any;

  private authListenerSubs: Subscription;
  private authClient: Subscription;
  private authStore: Subscription;
  private authAdmin: Subscription;

  profile: any;
  username: string
  profileisSet = false
  userRole: string;
  role: string;
  users: any = [];
  id: any;
  user: any;
  userlastName: string;
  userfirstName: string;


  constructor(private route: Router, private activatedRoute: ActivatedRoute, private userservices: UserService, private auth: AuthService) { }

  ngOnInit() {

    this.userfirstName = localStorage.getItem("firstName");
    this.userlastName = localStorage.getItem("lastName");


    this.id = this.activatedRoute.snapshot.paramMap.get('id');


    this.userservices.getUser(this.id).subscribe((response) => { this.user = response.user })

    this.userIsAuthenticated = this.auth.getIsAuth();
    console.log('here auth', this.userIsAuthenticated);
    this.authListenerSubs = this.auth.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;


    });
    this.clientIsAuthenticated = this.auth.getIsAuthClient();
    console.log('here auth client', this.clientIsAuthenticated);
    this.authClient = this.auth.getAuthClient().subscribe(isClent => {
      this.clientIsAuthenticated = isClent;
    });
    this.storeIsAuthenticated = this.auth.getIsAuthStore();
    console.log('here auth store', this.storeIsAuthenticated);
    this.authStore = this.auth.getAuthStore().subscribe(isStore => {
      this.storeIsAuthenticated = isStore;
    });
    this.adminIsAuthenticated = this.auth.getIsAuthAdmin();
    console.log('here auth admin ', this.adminIsAuthenticated);
    this.authAdmin = this.auth.getAuthAdmin().subscribe(isAdmin => {
      this.adminIsAuthenticated = isAdmin;
    });

    this.userservices.getAllUsers().subscribe((response) => { this.users = response.users });



  }


  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.authClient.unsubscribe();
    this.authStore.unsubscribe();
    this.authAdmin.unsubscribe();

    this.role = localStorage.getItem("role")


  }
  onLogout() {
    this.auth.logout();
    this.role = localStorage.getItem("role")

  }


  userObj() {
    let id = localStorage.getItem("userId");


    this.route.navigate([`dashboardStore/${id}`]);



  }
  userClient() {
    let id = localStorage.getItem("userId");


    this.route.navigate([`dashboardClient/${id}`]);



  }




}
