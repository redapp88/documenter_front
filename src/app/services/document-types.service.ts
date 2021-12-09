import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Category} from "../models/Category.model";

@Injectable({
  providedIn: 'root'
})
export class DocumentTypesService {

  typesSubject:Subject<any>=new Subject<any>();
  types:DocumentType[]

  emitCategories(){
    this.typesSubject.next(this.types);
  }

  constructor(private authService:AuthService,
              private http:HttpClient) {
  }

  public fetchTypes(){
    return new Observable(observer=>{

      this.http.get
      (`${environment.backEndUrl}/dtypes`,this.authService.httpOptions()).subscribe(
        (resData:any)=>{
          this.types=resData;
          //console.log(this.categories)
          this.emitCategories();
          observer.complete()
        },
        (error)=>{observer.error(error)}
      )

    })
  }


}
