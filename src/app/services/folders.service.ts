import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Category} from "../models/Category.model";
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Folder} from "../models/Folder.model";
import {FolderPage} from "../models/FolderPage.model";

@Injectable({
  providedIn: 'root'
})
export class FoldersService {
  foldersSubject:Subject<any>=new Subject<any>();
  folderPage:FolderPage

  emitFolders(){
    this.foldersSubject.next(this.folderPage);
  }

  constructor(private authService:AuthService,
              private http:HttpClient) {
  }

  public fetchFolders(page:number,size:number,keyword:string){
    return new Observable(observer=>{

      this.http.get
      (`${environment.backEndUrl}/folders?page=${page}&size=${size}&keyword=${keyword}`,this.authService.httpOptions()).subscribe(
        (resData:any)=>{
          this.folderPage=resData;
          //console.log(this.categories)
          this.emitFolders();
          observer.complete()
        },
        (error)=>{observer.error(error)}
      )

    })
  }

  public  addFolder(name: string, description: string,typeId:Category) {

    return  this.http.post
    (`${environment.backEndUrl}/folders`,{name:name,description:description,type: {id:typeId}},this.authService.httpOptions())
  }

  public editFolder(id: number, name: string, description: string,typeId:Category) {
    return  this.http.put
    (`${environment.backEndUrl}/folders/${id}`,{name:name,description:description,type: {id:typeId}},this.authService.httpOptions())
  }

  deleteFolder(id: number) {
    return  this.http.delete
    (`${environment.backEndUrl}/folders/${id}`,this.authService.httpOptions())
  }

  getFolder(id: number) {
    return  this.http.get
    (`${environment.backEndUrl}/folders/${id}`,this.authService.httpOptions())
  }
}
