import {Component, Inject, OnInit} from '@angular/core';
import {DocumentTypesService} from "../../../services/document-types.service";
import {UsersService} from "../../../services/users.service";
import {FoldersService} from "../../../services/folders.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-folder',
  templateUrl: './delete-folder.component.html',
  styleUrls: ['./delete-folder.component.css']
})
export class DeleteFolderComponent implements OnInit {


  errorMessage="";
  isLoading:boolean=false;

  constructor(private documentTypesService: DocumentTypesService,private usersService:UsersService,
              private foldersService:FoldersService,public dialogRef: MatDialogRef<DeleteFolderComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {id: number}) {
  }

  ngOnInit() {
    this.isLoading=false;
    this.errorMessage="";
  }





  onDeleteFolder() {
      this.foldersService.deleteFolder(   this.data.id).subscribe(
        ()=>{this.dialogRef.close('success');},
        (error)=>{this.errorMessage=error.error.message}
      )
    }



}
