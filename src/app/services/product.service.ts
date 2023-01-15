import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productURl: string = "http://localhost:3003/products";


  constructor(private http: HttpClient) { }


  addProduct(product, img: File) {


    let formData = new FormData();
    formData.append("img", img);
    formData.append("userId", product.userId);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("date", product.date);
    formData.append("categorie", product.categorie);
    formData.append("quantity", product.quantity);
    formData.append("statut", product.statut);


    return this.http.post<{ message: string }>(`${this.productURl}/addProduct`, formData);


  }


  editProduct(obj) {
    return this.http.put<{ message: string }>(`${this.productURl}/${obj.id}`, obj)
  }



  displayProduct(id) {

    return this.http.get<{ Product: any }>(`${this.productURl}/${id}`);


  }

  deleteProduct(id) {

    return this.http.delete<{ message: string }>(`${this.productURl}/${id}`);

  }

  getALLProducts() {

    // return this.http.get(this.matchURl);
    return this.http.get<{ Products: any }>(this.productURl);
  }


  searchProduct(obj) {

    return this.http.post<{ Products: any }>(`${this.productURl}/search`, obj);

  }
}
