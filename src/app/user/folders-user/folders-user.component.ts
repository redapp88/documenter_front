import {Component, OnInit} from '@angular/core';
import {Folder} from "../../models/Folder.model";
import {FoldersService} from "../../services/folders.service";
import {Category} from "../../models/Category.model";
import {Subscription} from "rxjs";
import {FolderPage} from "../../models/FolderPage.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {AddFolderComponent} from "./add-folder/add-folder.component";
import {EditFolderComponent} from "./edit-folder/edit-folder.component";
import {DeleteFolderComponent} from "./delete-folder/delete-folder.component";
import {Router} from "@angular/router";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-folders-user',
  templateUrl: './folders-user.component.html',
  styleUrls: ['./folders-user.component.css']
})
export class FoldersUserComponent implements OnInit {
  loadedFolderPage: FolderPage;
  errorMessage: string = "";
  isLoading: boolean = false;
  page = 0;
  size = 10;
  keyword="*";
  folderSubscription: Subscription
  form: FormGroup;

  constructor(private foldersService: FoldersService,public dialog: MatDialog,private router:Router,private sharedService:SharedService) {
  }

  ngOnInit(): void {
    this.isLoading = false;
    this.errorMessage = "";
    this.folderSubscription = this.foldersService.foldersSubject.subscribe(
      (resultData: FolderPage) => {
        this.loadedFolderPage = resultData;
      }
    )
    this.loadFolders();

    this.form = new FormGroup({
      keyword: new FormControl('', {
        updateOn: 'change',
        validators: []
      }),


    })

  }


  private loadFolders() {
    this.foldersService.fetchFolders(this.page, this.size, this.keyword).subscribe(
      () => {
      },
      (error) => {
        this.errorMessage = error.error.message;
      }
    )
  }

  onPaginatorChange($event: any) {
    console.log($event);
    this.page = $event.pageIndex;
    this.size = $event.pageSize;
    this.loadFolders();


  }

  onKeywordChange() {
  this.keyword=this.form.get('keyword').value;
  if(this.keyword == "")
    this.keyword = "*"
  this.loadFolders();
  }

  onAddFolder() {
    const dialogRef = this.dialog.open(AddFolderComponent, {
      width: this.sharedService.getPopupSize(),
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result=="success"){
        this.keyword="*";
        this.page=0;
        this.loadFolders();
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onEditFolder(folder:Folder) {
    const dialogRef = this.dialog.open(EditFolderComponent, {
      width: this.sharedService.getPopupSize(),
      data: {folder:folder}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result=="success"){
        this.loadFolders();
      }
    });
  }
  onDeleteFolder(id:number) {
    const dialogRef = this.dialog.open(DeleteFolderComponent, {
      data: {id:id},
      width: this.sharedService.getPopupSize(),
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result=="success"){
        this.loadFolders();
      }
    });
  }

  onOpenFolder(id) {
this.router.navigate(['/user/folders/'+id])
  }
}
