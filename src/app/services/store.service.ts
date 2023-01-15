import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  storeURl: string = "http://localhost:3003/store";

  constructor(private http: HttpClient) { }


  edit_StoreProduct(obj) {
    return this.http.put<{ message: string }>(`${this.storeURl}/${obj.id}`, obj)
  }



  getById_StoreProduct(id) {

    return this.http.get<{ storeProduct: any }>(`${this.storeURl}/${id}`);


  }


  delete_ProductStore(id) {

    return this.http.delete<{ message: string }>(`${this.storeURl}/${id}`);

  }

  getALL_StoreProducts() {


    return this.http.get<{ Products: any }>(this.storeURl);
  }

}
