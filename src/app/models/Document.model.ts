import {DocumentType} from "./DocumentType.model";

export class Document {
  public constructor(public id: string, public title: string, public description: string, public creatDate: Date,
                     public documentType: DocumentType, public imagesCount: number, public checksCount: number) {
  }
}
