import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {Category} from "../../models/Category.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoriesService} from "../../services/categories.service";
import {UsersService} from "../../services/users.service";
import {AppUser} from "../../models/AppUser.model";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import * as i18nIsoCountries from 'i18n-iso-countries';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  defaultValue = {
    name: '',
    alpha2Code: '',
    alpha3Code: '',
    numericCode: '',
    callingCode: ''
  };
  categorySubscription: Subscription
  loadedCategries: Category[] = []
  loadedUser:AppUser;
  form: FormGroup;
  errorMessage="";
  isLoading:boolean=false;
  mode:string="subscribe"

  constructor(private categoriesService: CategoriesService,
              private usersService:UsersService,
              private authService:AuthService,
              private router:Router,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.mode="subscribe"
    this.isLoading=false;
    this.errorMessage="";
    this.usersService.getUSer(this.authService.curentUser.username).subscribe(
      (resData:any)=>{
        console.log(resData);
        this.loadedUser=resData;
        this.defaultValue.alpha3Code=this.loadedUser.contry;
        this.defaultValue.alpha2Code=i18nIsoCountries.alpha3ToAlpha2(this.loadedUser.contry)
        this.defaultValue.numericCode=i18nIsoCountries.alpha3ToNumeric(this.loadedUser.contry)
        this.defaultValue.name=i18nIsoCountries.getName(this.defaultValue.alpha3Code, "en", {select: "official"});

       // console.log("**************",i18nIsoCountries.getName(this.loadedUser.contry, "en", {select: "official"}))
        this.defaultValue.alpha3Code=this.loadedUser.contry
        this.form.patchValue({
          username:  this.loadedUser.username,
          name:  this.loadedUser.name,
          description:  this.loadedUser.description,
          city:  this.loadedUser.city,
          postalCode:  this.loadedUser.postalCode,
          adress:  this.loadedUser.adress,
          category:  this.loadedUser.category.id,


        });
      },
    (error)=>{
        this.errorMessage=error.error.message;
    }
    )
    this.categorySubscription = this.categoriesService.categoriesSubject.subscribe(
      (resultData: Category[]) => {
        this.loadedCategries = resultData;
      }
    )
    this.loadCategories();

    this.form = new FormGroup({
      username: new FormControl(this.loadedUser?.username, {
        updateOn: 'change',
        validators: [Validators.required,
          Validators.email]
      }),

      name: new FormControl(this.loadedUser?.name, {
        updateOn: 'change',
        validators: [Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50)]

      }),
      description: new FormControl(this.loadedUser?.description, {
        updateOn: 'change',
        validators: [Validators.required,
          Validators.minLength(10)]
      }),
      contry: new FormControl(this.loadedUser?.contry, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      city: new FormControl(this.loadedUser?.city, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      postalCode: new FormControl(this.loadedUser?.postalCode, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      adress: new FormControl(this.loadedUser?.adress, {
        updateOn: 'change',
        validators: []
      }),
      category: new FormControl(this.loadedUser?.category.id, {
          updateOn: 'change',
          validators: [Validators.required]
        }
      ),


    })

  }

  private loadCategories() {

    this.categoriesService.fetchCategories().subscribe(
      () => {
      },
      (error) => {
        this.errorMessage=error.error.message;

      },
    );
  }

  onUpdate() {
    if(this.form.valid){

      this.isLoading=true;
      this.usersService.update(this.loadedUser.username,this.form.value['password'],this.form.value['name'],
        this.form.value['description'],this.form.value['contry'].alpha3Code,this.form.value['city'],this.form.value['adress'],
        this.form.value['postalCode'], this.form.value['category']).subscribe(
        (res)=>{
          this.isLoading=false;
          this.openSnackBar("Profile Edited succefully","")
          this.router.navigate(["/user/dashboard"])
        },
        (error)=>{
          console.log(error)
          this.isLoading=false;
          this.errorMessage = error.error.message
        }

      )
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 2000,
      //panelClass: ['blue-snackbar'],
    });
  }
}
