import {AppUser} from "./AppUser.model";
import {DocumentType} from "./DocumentType.model";

export class Folder{
  public constructor(public id:number,public name:string,public description:string,public documentsCount:number,
                     public user:AppUser,public type:DocumentType,public creationDate:Date,public checksCount) {
  }
}
