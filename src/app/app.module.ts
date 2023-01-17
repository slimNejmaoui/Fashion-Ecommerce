import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenCollectionComponent } from './components/men-collection/men-collection.component';
import { FeaturedProductComponent } from './components/featured-product/featured-product.component';
import { AllMensCollectionsComponent } from './components/all-mens-collections/all-mens-collections.component';
import { NewProductsComponent } from './components/new-products/new-products.component';
import { InspiredProductsComponent } from './components/inspired-products/inspired-products.component';
import { BlogComponent } from './components/blog/blog.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { NewproductOneComponent } from './components/newproduct-one/newproduct-one.component';
import { OneInspiredComponent } from './components/one-inspired/one-inspired.component';
import { OneBlogComponent } from './components/one-blog/one-blog.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { UsersTabComponent } from './components/users-tab/users-tab.component';
import { ProducstTabComponent } from './components/producst-tab/producst-tab.component';
import { ProfileComponent } from './components/profile/profile.component';

import { DisplayProductComponent } from './components/display-product/display-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ClientTabComponent } from './components/client-tab/client-tab.component';

import { JwPaginationModule } from 'jw-angular-pagination';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { AdminCommandeComponent } from './components/admin-commande/admin-commande.component';
import { FiltreCategoriePipe } from './pipes/filtre-categorie.pipe';
import { FiltrePipe } from './pipes/filtre.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { DashboardClientComponent } from './components/dashboard-client/dashboard-client.component';
import { DashboardStoreComponent } from './components/dashboard-store/dashboard-store.component';
import { StoreProductTabComponent } from './components/store-product-tab/store-product-tab.component';
import { StoreCommandeTabComponent } from './components/store-commande-tab/store-commande-tab.component';
import { ContactComponent } from './components/contact/contact.component';
import { BlogdetailComponent } from './components/blogdetail/blogdetail.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenCollectionComponent,
    FeaturedProductComponent,
    AllMensCollectionsComponent,
    NewProductsComponent,
    InspiredProductsComponent,
    BlogComponent,
    LoginComponent,
    SignupComponent,
    SingleProductComponent,
    NewproductOneComponent,
    OneInspiredComponent,
    OneBlogComponent,
    HomeComponent,
    ProductsComponent,
    AddProductComponent,
    DashboardComponent,
    UsersTabComponent,
    ProducstTabComponent,
    ProfileComponent,
    FiltreCategoriePipe,
    DisplayProductComponent,
    EditProductComponent,
    ClientTabComponent,
    FiltrePipe,
    SortPipe,
    DashboardClientComponent,
    DashboardStoreComponent,
    StoreProductTabComponent,
    StoreCommandeTabComponent,
    EditProfileComponent,

    AdminCommandeComponent,


    ContactComponent,


    BlogdetailComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwPaginationModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger', // set defaults here
    }),






  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
