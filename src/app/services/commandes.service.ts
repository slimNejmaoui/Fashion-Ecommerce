import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommandesService {
  commandetURl: string = "http://localhost:3003/commandes";


  constructor(private http: HttpClient) { }

  addCommande(commande) {


    return this.http.post<{ message: string, resultQuantity: any }>(`${this.commandetURl}`, commande);


  }

  getById_commandeClient(id) {

    return this.http.get<{ commandeClient: any }>(`${this.commandetURl}/${id}`);


  }


  getById_StoreCommande(id) {

    return this.http.get<{ storeCommande: any }>(`${this.commandetURl}/store/${id}`);


  }

  gettAllCommandes() {

    return this.http.get<{ order: any }>(this.commandetURl);
  }


  deleteProduct(id) {

    return this.http.delete<{ message: string }>(`${this.commandetURl}/${id}`);

  }

}
