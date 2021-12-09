import {Component, Inject, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {DocumentType} from "../../../models/DocumentType.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DocumentTypesService} from "../../../services/document-types.service";
import {UsersService} from "../../../services/users.service";
import {FoldersService} from "../../../services/folders.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Folder} from "../../../models/Folder.model";
import {DocumentsService} from "../../../services/documents.service";
import {ImagesService} from "../../../services/images.service";
import {MyImage} from "../../../models/MyImage.model";
import { environment } from 'src/environments/environment';
import {EditDocumentComponent} from "../edit-document/edit-document.component";
import {ImageMaximizeComponent} from "../image-maximize/image-maximize.component";


@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent implements OnInit {


  typeSubscription: Subscription
  loadedTypes: DocumentType[] = []
  form: FormGroup;
  errorMessage = "";
  isSavingDocument: boolean = false;
  isSavingImages: boolean = false;
  //*** images ***
  imageDeleteFrom: FormGroup;
  imageurls = [];
  base64String: string;
  name: string;
  imagePath: string;

  //***images ***//
  constructor(private documentTypesService: DocumentTypesService, private usersService: UsersService,
              private documentsService: DocumentsService, public dialogRef: MatDialogRef<AddDocumentComponent>,
              private imagesService: ImagesService,private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) private data: { id: number, folder: Folder }) {
  }

  ngOnInit() {
    this.isSavingDocument = false;
    this.isSavingImages = false;
    this.errorMessage = "";
    this.typeSubscription = this.documentTypesService.typesSubject.subscribe(
      (resultData: DocumentType[]) => {
        this.loadedTypes = resultData;
        const toSelect = this.data.folder.type.id;
        this.form.get('type').setValue(toSelect);
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
        validators: []
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
        this.errorMessage = error.error.message;

      },
    );

  }


  onSaveDocument() {
    this.isSavingDocument = true;
    this.isSavingImages = false;
    this.errorMessage = "";
    if (this.imageurls.length == 0) {
      this.errorMessage = "please select at lease one image"
    } else {
      this.documentsService.
      addDocument(this.data.id, this.form.value['name'], this.form.value['description'], this.form.value['type']).subscribe(
        (res: any) => {
          this.isSavingDocument = false;
          this.isSavingImages = true;
          let i: number = 0;
          let images: MyImage[] = [];
          this.imageurls.forEach(el => {
            let image: MyImage = new MyImage(null, el.base64String, i);
            // image.url=el;
            //image.ordre=i;
            i++;
            images.push(image)
          })
          this.imagesService.addImages(res.id, images).subscribe(
            (res) => {
              this.isSavingDocument = false;
              this.isSavingImages = false;
              this.dialogRef.close('success');
            },
            (error) => {
              this.errorMessage = error.message
              this.isSavingDocument = false;
              this.isSavingImages = false;
            }
          )
        },
        (error) => {
          this.isSavingDocument = false;
          this.isSavingImages = false;
          this.errorMessage = error.message
        }
      )
      console.log("images :", this.imageurls)
    }
    // console.log( this.form.value['name'],   this.form.value['description'],   this.form.value['type'])
    /*  if(this.form.valid){

      }*/


  }

  //***** images ****
  removeImageEdit(i, imagepath) {
    this.imageDeleteFrom.value.id = i;
    this.imageDeleteFrom.value.ImagePath = imagepath;
  }

  removeImage(i) {
    this.imageurls.splice(i, 1);
  }

  onSelectFile(event) {
    this.errorMessage="";

    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        let filename="";
        var reader = new FileReader();
        let image: HTMLImageElement = new Image();
        reader.onload = (event: any) => {
          image.src = event.target.result;
        //  console.log(filename=event.target.target);


        }
        image.onload = () => {

          console.log(image.title);
          if(image.height<parseInt(`${environment.min_resolution_height }`) || image.width < parseInt(`${environment.min_resolution_width }`) ){
            this.errorMessage= this.errorMessage+" must have a resolution of min <br> 1200x1200"
          }
           else{
          this.imageurls.push({base64String: image.src,});
          }
        };

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  public pushImage(url) {
    this.imageurls.push({base64String: url});
  }

//******** images *****
  maximizeImage(url) {
    const dialogRef = this.dialog.open(ImageMaximizeComponent, {
      data: {url:url},
      width: '60%',
    });

  }
}

