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
  
  User = {} as User;
  users: User[] = [];

  constructor(private userservice: UserService) {}

  ngOnInit(){
      this.userservice.getUsers().subscribe(dados => this.users = dados);
  }

  /*getUsers(){
    this.userservice.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }*/
  title = 'angular-http';
}
export class AppModule { }
