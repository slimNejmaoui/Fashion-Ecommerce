import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangeService {


  changeURl: string = "http://localhost:3003/change";

  constructor(private http: HttpClient) { }

  editUser(user) {

    return this.http.put<{ message: string }>(`${this.changeURl}/${user.id}`, user)

  }
}
