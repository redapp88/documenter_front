import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import {ConfirmLogoutComponent} from "../left-sidebar/confirm-logout/confirm-logout.component";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
@Component({
  selector: 'app-left-sidebar2',
  templateUrl: './left-sidebar2.component.html',
  styleUrls: ['./left-sidebar2.component.css']
})
export class LeftSidebar2Component{

  constructor(private authService:AuthService,private router:Router,public dialog: MatDialog) { }

  ngOnInit(): void {

  }
  onLogout(){
    const dialogRef = this.dialog.open(ConfirmLogoutComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result=="success"){
        console.log("logout")
        this.authService.logout();
        this.router.navigate(["public/home"]);
      }
    });

  }

  isCurrentRoute(route){
    return this.router.url === route
}

  showUrl() {
    console.log(this.router.url)
  }
}
