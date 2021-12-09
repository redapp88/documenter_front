import {Component, HostListener, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {ActivatedRoute} from "@angular/router";
import {DocumentsService} from "../../services/documents.service";
import {FoldersService} from "../../services/folders.service";
import {Folder} from "../../models/Folder.model";
import {Document} from "../../models/Document.model";
import {DocumentPage} from "../../models/DocumentPage.model";
import {FormControl, FormGroup} from "@angular/forms";
import {DeleteFolderComponent} from "../folders-user/delete-folder/delete-folder.component";
import {MatDialog} from "@angular/material/dialog";
import {AddDocumentComponent} from "./add-document/add-document.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DeleteDocumentsComponent} from "./delete-documents/delete-documents.component";
import {EditDocumentComponent} from "./edit-document/edit-document.component";
import {ImagesGalleryComponent} from "./images-gallery/images-gallery.component";


export interface PeriodicElement {
  position: number;
  title: string;
  description: string;
  date: string;
  documentType: string;
  checks:number,
  id:number,

}


/**
 * @title Table with selection
 */
@Component({
  selector: 'app-documents-user',
  templateUrl: './documents-user.component.html',
  styleUrls: ['./documents-user.component.css']
})
export class DocumentsUserComponent implements OnInit {
  public id:any;
  public currentFolder:Folder
  public errorMessage: string;
  public isLoading:boolean=false
  page = 0;
  size = 10;
  keyword="*";
  form: FormGroup;
  public ELEMENT_DATA = [];
  public numberOfElements=0;
  scrHeight:any;
  scrWidth:any;
  popUpWith :string= "60%";



  //displayedColumns: string[] = ['id', 'title', 'description', 'type', 'creatDate','checks'];
  displayedColumns: string[] = ['select', 'id', 'title','description','date','documentType','images','checks','action'];
  //displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  public constructor(private route: ActivatedRoute,private documentsService:DocumentsService,
                     private foldersService:FoldersService,public dialog: MatDialog,private _snackBar: MatSnackBar) {
  }
  ngOnInit(): void {
    this.adapteScreen();
    this.isLoading=true
    this.id = this.route.snapshot.paramMap.get('id')
    this.foldersService.getFolder(this.id).subscribe(
      (resp:any)=>{
        this.currentFolder=resp;

        this.documentsService.documentsSubject.subscribe(

          (resp:any)=>{
            this.ELEMENT_DATA=[];
            let i=0;
            resp.content.forEach(el=>{
              el.position=i;
              i++;
              this.ELEMENT_DATA.push(el)
            })
            this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
            this.numberOfElements=resp.numberOfElements;
          });
        this.loadDocuments()
      },
      (error) => {
        this.errorMessage=error.message
      }
    );
    this.form = new FormGroup({
      keyword: new FormControl('', {
        updateOn: 'change',
        validators: []
      }),


    })
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
  this.adapteScreen();
  }

  private adapteScreen(){
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    if( this.scrWidth<992){
      this.displayedColumns = ['select', 'id', 'title','action'];
      this.popUpWith="100%"
    }
    else{
      this.displayedColumns = ['select', 'id', 'title','description','date','documentType','images','checks','action'];
      this.popUpWith="60%"
    }
  }

  private loadDocuments() {
    this.documentsService.fetchDocuments(this.id,this.page,this.size,this.keyword).subscribe(
      ()=>{
      },
      error=>{
        this.errorMessage=error.message
      }
    )
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  onKeywordChange() {
    this.keyword=this.form.get('keyword').value;
    if(this.keyword == "")
      this.keyword = "*"
    this.loadDocuments();
  }

  onAddDocument() {
    const dialogRef = this.dialog.open(AddDocumentComponent, {
      data: {id:this.id,folder:this.currentFolder},
      width: this.popUpWith,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result=="success"){
        this.openSnackBar("Document added successfuly","")
        this.loadDocuments();
      }
    });
  }

  onPaginatorChange($event: any) {
    console.log($event);
    this.page = $event.pageIndex;
    this.size = $event.pageSize;
    this.loadDocuments()
  }

  onDeleteSelection() {
    let selectedElements = this.selection.selected
    if(selectedElements.length>0){
      const dialogRef = this.dialog.open(DeleteDocumentsComponent, {
        data: {selectedElements:selectedElements},
        width: this.popUpWith,
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result=="success"){
          this.selection.clear();
          this.openSnackBar("Documents deleted successfuly","")
          this.loadDocuments()
        }
      });
    }
    else{
      this.openSnackBar("no Document is selected", "Please select at least one")
    }

    console.log("Selection:",this.selection.selected)
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 2000,
      //panelClass: ['blue-snackbar'],
    });
  }


  onEditDocument(element) {
    const dialogRef = this.dialog.open(EditDocumentComponent, {
      data: {document:element},
      width: this.popUpWith,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result=="success"){
        this.openSnackBar("Document edited successfuly","")
        this.loadDocuments();
      }
    });
  }


  onDocumentsGallery( element){
    const dialogRef = this.dialog.open(ImagesGalleryComponent, {
      data: {document:element},
      width: this.popUpWith,
    });

  }
}
