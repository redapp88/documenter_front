import { Injectable } from '@angular/core';
import {Category} from "../models/Category.model";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http:HttpClient) {



  }
  getPopupSize(){
    let screenwidth = window.innerWidth;
    if(screenwidth<992){
      return "100%"
    }
    else {
      return "60%";
    }
  }



  public  sendContactMessage(email: string, name: string, body: string) {

    return  this.http.post
    (`${environment.backEndUrl}/contact`,{email:email,name:name,body:body})
  }
}
