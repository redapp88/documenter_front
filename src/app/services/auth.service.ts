import { Injectable } from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {environment} from "../../environments/environment";
import {LoggedUser} from "../models/LoggedUser.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  activeLogoutTimer:any;
  userSubject=new Subject<LoggedUser>();
  curentUser:LoggedUser=null;

  constructor(private http:HttpClient) {}
  public emitUser(){
    return this.userSubject.next(this.curentUser);
  }


  login(username:string,password:string){
    return new Observable((observer)=>{
      this.http.post(`${environment.backEndUrl}/login`,{username:username,password:password},{observe:"response"}).subscribe(
        (resData)=>{
          let jwt=resData.headers.get("authorization");
          this.setUserData(jwt);
          observer.complete();
        },
        (error)=>{
          observer.error(error)}
      )



    })

  }
  private setUserData(jwt:string){
    let jwtHelper=new JwtHelperService();
    if(jwt){
      let user:LoggedUser=
        new LoggedUser(jwtHelper.decodeToken(jwt).sub,
          jwtHelper.decodeToken(jwt).name,
          jwtHelper.decodeToken(jwt).state,
          jwtHelper.decodeToken(jwt).roles,
          new Date(new Date().getTime()+ +jwtHelper.decodeToken(jwt).experition),
          jwt)

      this.storeData(user);
      this.autoLogout(user.tokenDuration);
      this.curentUser=user;
      this.emitUser();
    }
  }

  private storeData(user:LoggedUser){
    let currentUser=JSON.stringify(user);
    localStorage.setItem('authData',currentUser);
  }


  autoLogin(){
    return new Observable<boolean>(observer=>{
     let authData =localStorage.getItem('authData')
          if(!authData){
            this.curentUser=null;
            this.emitUser();
            observer.next(false)

          }
          else{
            let data=JSON.parse(authData) as
            { username:string,
              name:string,
              state:string,
              roles:{authority:string}[],
              expirationDate:string,
              jwt:string};

            let user=
              new LoggedUser(data.username,data.name,data.state,data.roles,new Date(data.expirationDate),data.jwt)

            if(user.expirationDate<= new Date())
            {

              this.curentUser=null;
              this.emitUser();
              observer.next(false)

            }

            else{
              this.curentUser=user;
              this.emitUser();
              observer.next(true);
              this.autoLogout(user.tokenDuration);
            }
          }
          observer.complete()
        })



  }

  userIsAuthentificated():Observable<boolean>{
    let result=false
    if(this.curentUser)
      result=!!this.curentUser.jwt
    return of (result)
  }

  autoLogout(duration:number){
    if(this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer)
    }

    this.activeLogoutTimer=setTimeout(()=>{this.logout()},duration)
  }
  logout(){
    if(this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer)
    }
    this.curentUser=null;
    localStorage.removeItem("authData")
    this.emitUser();
  }


  ngOnDestroy(): void {
    if(this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer)
    }
  }

  isUser(){
    if(!this.curentUser)
      return false
    return this.curentUser.roles.filter(r=>r.authority==="USER").length>0;
  }

  isManager(){
    if(!this.curentUser)
      return false

    return this.curentUser.roles.filter(r=>r.authority==="MANAGER").length>0;
  }

  isAuthentificated():Observable<boolean>{
    //console.log(this.curentUser)
    let result=false
    if(this.curentUser && this.curentUser != null)
      result= true
    return of (result)
  }



  public httpOptions(){
    let httpOptions
    if(this.curentUser != null)
    {

      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': this.curentUser.jwt
        })
      };
    }
    else {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };  }

    return httpOptions;
  }
}
