import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  user = {} as User;
  users: User[] = [];

  constructor(private userservice: UserService) {}

  ngOnInit(){
      this.getUsers();
  }

  getUsers(){
    this.userservice.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
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

  title = 'angular-http';
}
export class AppModule { }
