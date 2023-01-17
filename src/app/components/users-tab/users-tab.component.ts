import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeService } from 'src/app/services/change.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-tab',
  templateUrl: './users-tab.component.html',
  styleUrls: ['./users-tab.component.css']
})
export class UsersTabComponent implements OnInit {

  users: any = [];
  id: any;
  user: any;
  term: string

  constructor(private usersService: UserService, private route: Router, private activatedRoute: ActivatedRoute, private changeServices: ChangeService) { }

  ngOnInit() {


    this.usersService.getAllUsers().subscribe((response) => { this.users = response.users });

  }

  gotoDisplay(id: any) {

    this.route.navigate([`profile/${id}`]);
  }

  gotoEdit(id: any) {


    this.route.navigate([`editProfile/${id}`]);
  }
  deleteMatch(id) {

    this.usersService.deleteUser(id).subscribe((response) => {
      console.log("here reponse after delete match", response.message);
      this.usersService.getAllUsers().subscribe(
        (response) => {
          this.users = response.users;
        }
      )
    })


  }

  // changeStatut(id) {

  //   alert(id)
  //   this.user.value.statut = "Active";

  //   console.log(this.user.value.statut);


  //   this.changeServices.editUser(this.user.value.statut).subscribe((response) => {
  //     console.log("here this a new  object", response.message);

  //   })
  //   this.route.navigate(['dashboard']);

  // }






}
