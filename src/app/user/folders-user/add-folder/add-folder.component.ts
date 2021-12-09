import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../../services/users.service";
import {DocumentTypesService} from "../../../services/document-types.service";
import {DocumentType} from "../../../models/DocumentType.model";
import {FoldersService} from "../../../services/folders.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-folder',
  templateUrl: './add-folder.component.html',
  styleUrls: ['./add-folder.component.css']
})
export class AddFolderComponent implements OnInit {


  typeSubscription: Subscription
  loadedTypes: DocumentType[] = []
  form: FormGroup;
  errorMessage="";
  isLoading:boolean=false;

  constructor(private documentTypesService: DocumentTypesService,private usersService:UsersService,
              private foldersService:FoldersService,public dialogRef: MatDialogRef<AddFolderComponent>) {
  }

  ngOnInit() {
    this.isLoading=false;
    this.errorMessage="";
    this.typeSubscription = this.documentTypesService.typesSubject.subscribe(
      (resultData: DocumentType[]) => {
        this.loadedTypes = resultData;
        const toSelect =  this.loadedTypes[0].id;
        this.form.get('type').setValue(toSelect);
        //console.log("****", this.loadedTypes[0].id)
      }
    )
    this.loadTypes();

    this.form = new FormGroup({

      name: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50)]

      }),
      description: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required,
          Validators.minLength(10)]
      }),
      type: new FormControl('', {
          updateOn: 'change',
          validators: [Validators.required]
        }
      ),


    })

  }

  private loadTypes() {

    this.documentTypesService.fetchTypes().subscribe(
      () => {

      },
      (error) => {
        this.errorMessage=error.error.message;

      },
    );

  }



  onSaveFolder() {
   // console.log( this.form.value['name'],   this.form.value['description'],   this.form.value['type'])
   if(this.form.valid){
      this.foldersService.addFolder(   this.form.value['name'],   this.form.value['description'],   this.form.value['type']).subscribe(
        ()=>{this.dialogRef.close('success');},
      (error)=>{this.errorMessage=error.error.message}
      )
    }


  }
}
