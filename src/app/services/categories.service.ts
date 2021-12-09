import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Category} from "../models/Category.model";
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  categoriesSubject:Subject<any>=new Subject<any>();
  categories:Category[]

  emitCategories(){
    this.categoriesSubject.next(this.categories);
  }

  constructor(private authService:AuthService,
              private http:HttpClient) {
  }

  public fetchCategories(){
    return new Observable(observer=>{

      this.http.get
      (`${environment.backEndUrl}/categories/all`,this.authService.httpOptions()).subscribe(
        (resData:any)=>{
          this.categories=resData;
          //console.log(this.categories)
          this.emitCategories();
          observer.complete()
        },
        (error)=>{observer.error(error)}
      )

    })
  }
}
