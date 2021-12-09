import { Injectable } from '@angular/core';
import {Category} from "../models/Category.model";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class CheckingService {

  constructor(private http:HttpClient,private authService:AuthService) { }


  public  foldersTopChecking(username:string) {

    return  this.http.get
    (`${environment.backEndUrl}/checks/folders?username=${username}`,this.authService.httpOptions())
  }

  public  documentsTopChecking(username:string) {

    return  this.http.get
    (`${environment.backEndUrl}/checks/documents?username=${username}`,this.authService.httpOptions())
  }

  public  getChecksMonth(username:string) {

    return  this.http.get
    (`${environment.backEndUrl}/checks/yearChecks?username=${username}`,this.authService.httpOptions())
  }

  public  checkDocument(documentId:string) {

    return  this.http.get
    (`${environment.backEndUrl}/checks/check?documentId=${documentId}`,this.authService.httpOptions())
  }
}
