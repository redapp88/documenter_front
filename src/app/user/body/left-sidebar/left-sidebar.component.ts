import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDocumentsComponent} from "../../documents-user/delete-documents/delete-documents.component";
import {ConfirmLogoutComponent} from "./confirm-logout/confirm-logout.component";
import * as $ from 'jquery';
@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {

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



}
