import { DialogConfig } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})

export class PopupComponent {
  constructor (private ref:MatDialogRef<PopupComponent>) {}

  close(){
    this.ref.close();
  }
}