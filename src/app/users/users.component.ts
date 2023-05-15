import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import { ConfirmationDialogComponent } from '../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UserComponent{
  
  user = {} as User;
  users: User[] = [];

  constructor(private userservice: UserService, private dialog:MatDialog) {}

  ngOnInit(){
      this.getUsers();
  }

  getUsers(){
    this.userservice.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  onRemove(user: User) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Deseja remover esse usuário?'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result){
      this.userservice.deleteUser(user).subscribe(() => {
        this.getUsers();
      });
    }
    });
  } 

  editUser(user: User) {
    this.user = { ...user };
  }

  saveUser(form: NgForm){
    if (this.user.id !== undefined){
      this.userservice.updateUser(this.user).subscribe(() =>{
        this.cleanForm(form);
      })
    } else{
      this.userservice.saveUser(this.user).subscribe(() => {
        this.cleanForm(form);
      })
    }
  }

  cleanForm(form: NgForm){
    this.getUsers();
    form.resetForm();
    this.user = {} as User;
  }
}
