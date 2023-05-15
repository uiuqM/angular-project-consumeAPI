import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { NgForm } from '@angular/forms';
import { Product } from '../models/product';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { ConfirmationDialogComponent } from '../shared/components/confirmation-dialog/confirmation-dialog.component';

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
      this.productservice.updateProduct(this.product).subscribe(() =>{
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

  onRemove(product: Product) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Deseja remover esse produto?'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result){
      this.productservice.deleteProduct(product).subscribe(() => {
        this.getProducts();
      });
    }
    });
  } 
  editProduct(product: Product) {
    this.product = { ...product };
  }
}
