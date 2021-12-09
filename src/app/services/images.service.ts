import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {DocumentPage} from "../models/DocumentPage.model";
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Category} from "../models/Category.model";
import {MyImage} from "../models/MyImage.model";

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  imagesSubject:Subject<any>=new Subject<any>();
  images:MyImage[];
  emitImages(){
    this.imagesSubject.next(this.images);
  }

  constructor(private authService:AuthService,
              private http:HttpClient) {
  }

  public fetchImages(documentId:string){
    return new Observable(observer=>{

      this.http.get
      (`${environment.backEndUrl}/images?documentId=${documentId}`,this.authService.httpOptions()).subscribe(
        (resData:any)=>{
          this.images=resData;
          this.emitImages()
          observer.complete()
        },
        (error)=>{observer.error(error)}
      )

    })
  }

  public  addImages(documentId:number,images:MyImage[]) {
    return  this.http.post
    (`${environment.backEndUrl}/images`,{documentId:documentId,images:images},this.authService.httpOptions())
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
  /*delete(ids: string[]) {
    return  this.http.post
    (`${environment.backEndUrl}/documents/delete`,ids,this.authService.httpOptions())
  }*/
  editImages(id: string, images: MyImage[]) {
    return  this.http.put
    (`${environment.backEndUrl}/images/${id}`,{documentId:id,images:images},this.authService.httpOptions())
  }
}
