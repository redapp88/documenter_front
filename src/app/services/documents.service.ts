import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {FolderPage} from "../models/FolderPage.model";
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Category} from "../models/Category.model";
import {DocumentPage} from "../models/DocumentPage.model";


@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documentsSubject:Subject<any>=new Subject<any>();
  documentPage:DocumentPage

  emitDocuments(){
    this.documentsSubject.next(this.documentPage);
  }

  constructor(private authService:AuthService,
              private http:HttpClient) {
  }

  public fetchDocuments(folderId:number,page:number,size:number,keyword:string){
    return new Observable(observer=>{

      this.http.get
      (`${environment.backEndUrl}/documents?folderId=${folderId}&page=${page}&size=${size}&keyword=${keyword}`,this.authService.httpOptions()).subscribe(
        (resData:any)=>{
          this.documentPage=resData;
          //console.log(this.categories)
          this.emitDocuments()
          observer.complete()
        },
        (error)=>{observer.error(error)}
      )

    })
  }

public  addDocument(folderId:number,title: string, description: string,typeId:Category) {
    return  this.http.post
    (`${environment.backEndUrl}/documents`,{folder:{id:folderId},title:title
      ,description:description,documentType: {id:typeId}},this.authService.httpOptions())
  }
  /*
   public editFolder(id: number, name: string, description: string,typeId:Category) {
     return  this.http.put
     (`${environment.backEndUrl}/folders/${id}`,{name:name,description:description,type: {id:typeId}},this.authService.httpOptions())
   }

   deleteFolder(id: number) {
     return  this.http.delete
     (`${environment.backEndUrl}/folders/${id}`,this.authService.httpOptions())
   }*/
  delete(ids: string[]) {
    console.log("********************",ids)
    return  this.http.post
    (`${environment.backEndUrl}/documents/delete`,ids,this.authService.httpOptions())
  }

  public editDocument(id:string,title: string, description: string,typeId:Category) {
    return  this.http.put
    (`${environment.backEndUrl}/documents/${id}`,{title:title
      ,description:description,documentType: {id:typeId}},this.authService.httpOptions())
  }
}
