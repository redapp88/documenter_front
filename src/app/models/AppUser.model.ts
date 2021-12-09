import {Category} from "./Category.model";

export class AppUser{
  public constructor(public username:string,public password:string,public name:string,public description:string,
                     public contry:string, public city:string,public adress:string,public postalCode:string,
                     public state:string,public category:Category) {
  }
}
