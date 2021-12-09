import {Component, Inject, OnInit} from '@angular/core';
import {DocumentTypesService} from "../../../services/document-types.service";
import {UsersService} from "../../../services/users.service";
import {FoldersService} from "../../../services/folders.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DocumentsService} from "../../../services/documents.service";

@Component({
  selector: 'app-delete-documents',
  templateUrl: './delete-documents.component.html',
  styleUrls: ['./delete-documents.component.css']
})
export class DeleteDocumentsComponent implements OnInit {

  errorMessage="";
  isLoading:boolean=false;

  constructor(private documentsService: DocumentsService,private usersService:UsersService,
              private foldersService:FoldersService,public dialogRef: MatDialogRef<DeleteDocumentsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {selectedElements: any}) {
  }

  ngOnInit() {
    this.isLoading=false;
    this.errorMessage="";
  }





  onDeleteDocments() {

    let ids:string[]=[];
    this.data.selectedElements.forEach(el=>{
      ids.push(el.id)
    })
    console.log(ids)
    this.documentsService.delete(ids).subscribe(
      ()=>{this.dialogRef.close('success');},
      (error)=>{this.errorMessage=error.error.message}
    )
 /*   this.foldersService.deleteFolder(   this.data.id).subscribe(
      ()=>{this.dialogRef.close('success');},
      (error)=>{this.errorMessage=error.message}
    )*/
  }



}

