import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Category} from "../models/Category.model";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient,private authService:AuthService) { }

  public  subscribe(username: string, password: string, name: string, description: string, contry: string,
                    city: string,adress: string,postalCode: string,category:Category) {
    return  this.http.post
    (`${environment.backEndUrl}/users/subscribe?ln=${this.getLanguage()}`,{username:username,password:password,name:name,description:description,
      contry:contry,city:city,adress:adress,postalCode:postalCode,category: {id:category}})
  }

  public  getUSer(username: string) {

    return  this.http.get
    (`${environment.backEndUrl}/users/${username}`,this.authService.httpOptions())
  }


  public  update(username: string, password: string, name: string, description: string, contry: string,
                    city: string,adress: string,postalCode: string,category:Category) {

    return  this.http.put
    (`${environment.backEndUrl}/users/${username}`,{password:password,name:name,description:description,
      contry:contry,city:city,adress:adress,postalCode:postalCode,category: {id:category}},this.authService.httpOptions())
  }
  public  editPassword(username: string, currentPassword: string, password: string) {

    return  this.http.put
    (`${environment.backEndUrl}/users/password/${username}`,{currentPassword:currentPassword,password:password,ln:this.getLanguage() },this.authService.httpOptions())
  }
  public  resetPassword(username: string) {

    return  this.http.put
    (`${environment.backEndUrl}/users/resetPassword/${username}`,{ln:this.getLanguage() })
  }


  private getLanguage(){
    let ln=localStorage.getItem('language');
    if(!ln){
     return "in"
    }
    else{
      return ln
    }
}
}
