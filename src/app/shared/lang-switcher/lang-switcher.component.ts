import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-lang-switcher',
  templateUrl: './lang-switcher.component.html',
  styleUrls: ['./lang-switcher.component.css']
})
export class LangSwitcherComponent implements OnInit{

  constructor(private translate: TranslateService,authService:AuthService) { }
  public languages = [
    { value: 'en', display: 'English' },
    { value: 'fr', display: 'French' },

  ];

  form = new FormGroup({
    language: new FormControl(this.languages[0].value, Validators.required)
  });


  onChange(e) {
    //console.log(e.target.value);
    this.translate.use(e.target.value);
  }

  ngOnInit(): void {
    this.translate.setDefaultLang("en")
    let ln=localStorage.getItem('language');
    if(!ln){
      this.translate.use("en")
    }
    else{
      this.translate.use(ln)
    }

  }

  onChangeLangue(ln: string) {
    localStorage.setItem('language',ln);
    this.translate.use(ln);
  }
}
