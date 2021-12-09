import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CheckingService} from "../../services/checking.service";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {ThemePalette} from '@angular/material/core';
import {EditDocumentComponent} from "../../user/documents-user/edit-document/edit-document.component";
import {MatDialog} from "@angular/material/dialog";
import {AlertMessageComponent} from "../../shared/alert-message/alert-message.component";
import {ImagesGalleryComponent} from "../../user/documents-user/images-gallery/images-gallery.component";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-doc-verify-public',
  templateUrl: './doc-verify-public.component.html',
  styleUrls: ['./doc-verify-public.component.css']
})
export class DocVerifyPublicComponent implements OnInit {
  form: FormGroup;
  isLoading:boolean=false;
  errorMessage="";
//sprinner
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;

  constructor(private checkingService:CheckingService,public dialog: MatDialog,private translate: TranslateService) { }

  ngOnInit(): void {
    this.isLoading=false;
    this.errorMessage="";
    this.form = new FormGroup({
      docId: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required,Validators.minLength(10)]
      })


  })

  }

  onSearchDocument(){
    if(this.form.valid){
      let docId:string=this.form.get("docId").value
      this.isLoading=true;
      this.checkingService.checkDocument(docId).subscribe(
        (res:any)=>{
          console.log(res)
          this.onShowDocument(res);
          this.isLoading=false
        },
        (error)=>{
          this.isLoading=false;
          this.errorMessage=error.error.message
          this.alert( this.errorMessage);
        }
      )
    }

  }

private alert(message:string) {

    const dialogRef = this.dialog.open(AlertMessageComponent, {
      data: {message:message},
      width: '60%',
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }


  onShowDocument( document){
    const dialogRef = this.dialog.open(ImagesGalleryComponent, {
      data: {document:document},
      width: '60%',
    });

  }
}
