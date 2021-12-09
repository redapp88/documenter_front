import {Component, Inject, OnInit} from '@angular/core';
import {DocumentTypesService} from "../../../services/document-types.service";
import {UsersService} from "../../../services/users.service";
import {DocumentsService} from "../../../services/documents.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ImagesService} from "../../../services/images.service";
import {Document} from "../../../models/Document.model";
import {DocumentType} from "../../../models/DocumentType.model";
import {MyImage} from "../../../models/MyImage.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {ImageMaximizeComponent} from "../image-maximize/image-maximize.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-images-gallery',
  templateUrl: './images-gallery.component.html',
  styleUrls: ['./images-gallery.component.css']
})
export class ImagesGalleryComponent implements OnInit {

  errorMessage = "";
  isLoadingImages: boolean = false;
  //*** images ***
  loadedImages: MyImage[] = [];
  originalLoadedImages: MyImage[] = [];
  base64String: string;
  name: string;
  imagePath: string;

  constructor(
    private documentsService: DocumentsService, public dialogRef: MatDialogRef<ImagesGalleryComponent>,
    private imagesService: ImagesService,
    @Inject(MAT_DIALOG_DATA) public data: { document: Document }, private dialog: MatDialog) {
  }

  ngOnInit() {


    this.imagesService.imagesSubject.subscribe(
      (resultData: MyImage[]) => {
        this.loadedImages = resultData;
        this.originalLoadedImages = resultData;
      }
    )
    this.loadImages();
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


  //***** images ****
  maximizeImage(url) {
    const dialogRef = this.dialog.open(ImageMaximizeComponent, {
      data: {url: url},
      width: '60%',
    });

  }

//******** images *****
}
