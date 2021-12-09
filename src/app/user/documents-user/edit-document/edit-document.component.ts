import {Component, Inject, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {DocumentType} from "../../../models/DocumentType.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DocumentTypesService} from "../../../services/document-types.service";
import {UsersService} from "../../../services/users.service";
import {DocumentsService} from "../../../services/documents.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ImagesService} from "../../../services/images.service";
import {Folder} from "../../../models/Folder.model";
import {MyImage} from "../../../models/MyImage.model";
import {Document} from "../../../models/Document.model";
import {environment} from "../../../../environments/environment";
import {ImageMaximizeComponent} from "../image-maximize/image-maximize.component";

@Component({
  selector: 'app-edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['./edit-document.component.css']
})
export class EditDocumentComponent implements OnInit {


  typeSubscription: Subscription
  loadedTypes: DocumentType[] = []
  form: FormGroup;
  errorMessage = "";
  isSavingDocument: boolean = false;
  isSavingImages: boolean = false;
  isLoadingImages: boolean = false;
  hasChangedImages: boolean = false
  //*** images ***
  imageDeleteFrom: FormGroup;
  loadedImages: MyImage[] = [];
  originalLoadedImages: MyImage[] = [];
  base64String: string;
  name: string;
  imagePath: string;

  //***images ***//
  constructor(private documentTypesService: DocumentTypesService, private usersService: UsersService,
              private documentsService: DocumentsService, public dialogRef: MatDialogRef<EditDocumentComponent>,
              private imagesService: ImagesService, private imageService: ImagesService,
              @Inject(MAT_DIALOG_DATA) private data: { document: Document },private dialog: MatDialog) {
  }

  ngOnInit() {
    this.isSavingDocument = false;
    this.isSavingImages = false;
    this.hasChangedImages = false;
    this.errorMessage = "";
    this.typeSubscription = this.documentTypesService.typesSubject.subscribe(
      (resultData: DocumentType[]) => {
        this.loadedTypes = resultData;
        const toSelect = this.data.document.documentType.id;
        this.form.get('type').setValue(toSelect);
      }
    )
    this.imagesService.imagesSubject.subscribe(
      (resultData: MyImage[]) => {
        this.loadedImages = resultData;
        this.originalLoadedImages = resultData;
      }
    )
    this.loadTypes();
    this.loadImages();
    this.form = new FormGroup({

      name: new FormControl(this.data.document.title, {
        updateOn: 'change',
        validators: [Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50)]

      }),
      description: new FormControl(this.data.document.description, {
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
    this.isLoadingImages = true;
    this.documentTypesService.fetchTypes().subscribe(
      () => {
        this.isLoadingImages = false;
      },
      (error) => {
        this.errorMessage = error.error.message;
        this.isLoadingImages = false;
      },
    );
  }

  private loadImages() {

    this.imagesService.fetchImages(this.data.document.id).subscribe(
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
    if (this.loadedImages.length == 0) {
      this.errorMessage = "please select at lease one image"
      this.isSavingDocument = false;
      this.isSavingImages = false;
    } else {
      this.documentsService.editDocument(this.data.document.id, this.form.value['name'], this.form.value['description'], this.form.value['type']).subscribe(
        (res: any) => {

          if (this.hasChangedImages) {
            this.isSavingDocument = false;
            this.isSavingImages = true;
            let i: number = 0;

            for (i=0;i<this.loadedImages.length;i++){
              this.loadedImages[i].ordre=i;
            }
            console.log("*************************",this.loadedImages)
            this.imagesService.editImages(this.data.document.id, this.loadedImages).subscribe(
              (res) => {
                this.isSavingDocument = false;
                this.isSavingImages = false;
                this.dialogRef.close('success');
              },
              (error) => {
                this.errorMessage = error.error.message
                this.isSavingDocument = false;
                this.isSavingImages = false;
              }
            )
          }
        },
        (error) => {
          this.isSavingDocument = false;
          this.isSavingImages = false;
          this.errorMessage = error.error.message
        }
      )
    }


  }

  //***** images ****
  removeImageEdit(i, imagepath) {
    this.imageDeleteFrom.value.id = i;
    this.imageDeleteFrom.value.ImagePath = imagepath;
  }

  removeImage(i) {
    this.hasChangedImages = true;
    this.loadedImages.splice(i, 1);
  }

  onSelectFile(event) {

    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        let image: HTMLImageElement = new Image();
        reader.onload = (event: any) => {
          image.src = event.target.result;


          //this.imageurls.push({ base64String: event.target.result, });
        }
        image.onload = () => {
          if(image.height<parseInt(`${environment.min_resolution_height }`) || image.width < parseInt(`${environment.min_resolution_width }`) ){
            this.errorMessage= this.errorMessage+" must have a resolution of min <br>"
          }
          else{
            this.hasChangedImages = true;
            this.loadedImages.push(new MyImage(null, event.target.result, null));
          }
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  maximizeImage(url) {
    const dialogRef = this.dialog.open(ImageMaximizeComponent, {
      data: {url:url},

    });

  }
//******** images *****
}
