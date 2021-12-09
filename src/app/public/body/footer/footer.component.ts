import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AlertMessageComponent} from "../../../shared/alert-message/alert-message.component";
import {TermsComponent} from "../terms/terms.component";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public dialog: MatDialog,private translate: TranslateService) { }

  ngOnInit(): void {
  }

  onShowTerms() {
    const dialogRef = this.dialog.open(TermsComponent, {
      data: {},
      width: '80%',
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
