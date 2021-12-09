import {Component, Inject, OnInit} from '@angular/core';
import {DocumentsService} from "../../../../services/documents.service";
import {UsersService} from "../../../../services/users.service";
import {FoldersService} from "../../../../services/folders.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-logout',
  templateUrl: './confirm-logout.component.html',
  styleUrls: ['./confirm-logout.component.css']
})
export class ConfirmLogoutComponent implements OnInit {


  constructor( public dialogRef: MatDialogRef<ConfirmLogoutComponent>) {
  }

  ngOnInit() {

  }
  onConfirm() {

  this.dialogRef.close('success');

  }
}
