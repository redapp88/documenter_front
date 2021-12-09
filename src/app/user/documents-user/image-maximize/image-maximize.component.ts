import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Document} from "../../../models/Document.model";

@Component({
  selector: 'app-image-maximize',
  templateUrl: './image-maximize.component.html',
  styleUrls: ['./image-maximize.component.css']
})
export class ImageMaximizeComponent implements OnInit {

  constructor(  @Inject(MAT_DIALOG_DATA) public data: { url: string }) { }
image_url=""
  ngOnInit(): void {
    this.image_url=this.data.url
  }

  onPrint(url) {
   const printContent = document.getElementById("print-area");
    const WindowPrt = window.open('', '', '');
    WindowPrt.document.write("<img style='width: 700px;height: 1000px' src="+url+">");
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
    //
 /*   let popup = window.open();
    popup.document.write( "<img style='width: 700px;height: 1000px' src="+url+">");
    popup.focus(); //required for IE
    popup.print();*/

  }
}
