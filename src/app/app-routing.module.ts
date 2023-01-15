import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { BlogdetailComponent } from './components/blogdetail/blogdetail.component';
import { ContactComponent } from './components/contact/contact.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardClientComponent } from './dashboard-client/dashboard-client.component';
import { DashboardStoreComponent } from './dashboard-store/dashboard-store.component';

import { ProfileComponent } from './profile/profile.component';
import { DisplayProductComponent } from './components/display-product/display-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "registre", component: SignupComponent },
  { path: "registre-store", component: SignupComponent },
  { path: "registre-admin", component: SignupComponent },
  { path: "products", component: ProductsComponent },
  { path: "add-products", component: AddProductComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "profile/:id", component: ProfileComponent },
  { path: "dashboardStore/:id", component: DashboardStoreComponent },
  { path: "dashboardClient/:id", component: DashboardClientComponent },
  { path: "contact", component: ContactComponent },
  { path: "blog", component: BlogdetailComponent },

  { path: "displayProduct/:id", component: DisplayProductComponent },
  { path: "editProduct/:id", component: EditProductComponent },
  { path: "editProfile/:id", component: EditProfileComponent },






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
