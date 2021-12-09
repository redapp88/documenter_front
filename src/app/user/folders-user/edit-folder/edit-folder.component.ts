import {Component, Inject, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {DocumentType} from "../../../models/DocumentType.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DocumentTypesService} from "../../../services/document-types.service";
import {UsersService} from "../../../services/users.service";
import {FoldersService} from "../../../services/folders.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Folder} from "../../../models/Folder.model";

@Component({
  selector: 'app-edit-folder',
  templateUrl: './edit-folder.component.html',
  styleUrls: ['./edit-folder.component.css']
})
export class EditFolderComponent implements OnInit {


  typeSubscription: Subscription
  loadedTypes: DocumentType[] = []
  form: FormGroup;
  errorMessage="";
  isLoading:boolean=false;
  constructor(private documentTypesService: DocumentTypesService,private usersService:UsersService,
              private foldersService:FoldersService,public dialogRef: MatDialogRef<EditFolderComponent>,
              @Inject(MAT_DIALOG_DATA) private data: {folder: Folder}
              ) {
  }

  ngOnInit() {
    this.isLoading=false;
    this.errorMessage="";
    this.typeSubscription = this.documentTypesService.typesSubject.subscribe(
      (resultData: DocumentType[]) => {
        this.loadedTypes = resultData;
        const toSelect =  this.data.folder.type.id;
        this.form.get('type').setValue(toSelect);
        //console.log("****", this.loadedTypes[0].id)
      }
    )
    this.loadTypes();

    this.form = new FormGroup({

      name: new FormControl(this.data.folder.name, {
        updateOn: 'change',
        validators: [Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50)]

      }),
      description: new FormControl(this.data.folder.description, {
        updateOn: 'change',
        validators: [Validators.required,
          Validators.minLength(10)]
      }),
      type: new FormControl(this.data.folder.type.id, {
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



  onEditFolder() {
    // console.log( this.form.value['name'],   this.form.value['description'],   this.form.value['type'])
    if(this.form.valid){
      this.foldersService.editFolder( this.data.folder.id,this.form.value['name'],   this.form.value['description'],   this.form.value['type']).subscribe(
        ()=>{this.dialogRef.close('success');},
        (error)=>{this.errorMessage=error.error.message}
      )
    }


  }
}
