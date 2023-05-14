import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { NgForm } from '@angular/forms';
import { Product } from '../models/product';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent{
  
  product = {} as Product;
  products: Product[] = [];

  constructor(private productservice: ProductService,
    private dialog: MatDialog) {}

  ngOnInit(){
      this.getProducts();
  }

  getProducts(){
    this.productservice.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  saveProduct(form: NgForm){
    if (this.product.id !== undefined){
      this.productservice.updateUser(this.product).subscribe(() =>{
        this.cleanForm(form);
      })
    } else{
      this.productservice.saveProduct(this.product).subscribe(() => {
        this.cleanForm(form);
      })
    }
  }

  cleanForm(form: NgForm){
    this.getProducts();
    form.resetForm();
    this.product = {} as Product;
  }

  Openpopup(){
    
    const dialogConfig = new MatDialogConfig;

    dialogConfig.width = '60%';
    dialogConfig.autoFocus = true;

    this.dialog.open(PopupComponent, dialogConfig);
  }

  title = 'angular-http';
}
