import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {CategoriesService} from "../../services/categories.service";
import {Subscription} from "rxjs";
import {Category} from "../../models/Category.model";
import {UsersService} from "../../services/users.service";


interface Country {
  name: string;
  alpha2Code: string;
  alpha3Code: string;
  numericCode: string;
  callingCode: string;
}

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {

  defaultValue = {
    name: 'Deutschland',
    alpha2Code: 'DE',
    alpha3Code: 'DEU',
    numericCode: '276',
    callingCode: '276'
  };
  categorySubscription: Subscription
  loadedCategries: Category[] = []
  form: FormGroup;
  errorMessage="";
  isLoading:boolean=false;
  mode:string="subscribe"

  constructor(private categoriesService: CategoriesService,private usersService:UsersService) {
  }

  ngOnInit() {
    this.mode="subscribe"
    this.isLoading=false;
    this.errorMessage="";
    this.categorySubscription = this.categoriesService.categoriesSubject.subscribe(
      (resultData: Category[]) => {
        this.loadedCategries = resultData;
      }
    )
    this.loadCategories();

    this.form = new FormGroup({
      username: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required,
          Validators.email]
      }),
      password: new FormControl('', {
        updateOn: 'change',
        validators: [
          Validators.required,
          Validators.minLength(6)]
      }),
      repassword: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required,
          Validators.minLength(6)]
      }),
      name: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required,
          Validators.minLength(8),
        Validators.maxLength(50)]

      }),
      description: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required,
          Validators.minLength(10)]
      }),
      contry: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      city: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      postalCode: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      adress: new FormControl('', {
        updateOn: 'change',
        validators: []
      }),
      category: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required]
      }
      ),


    })

  }
  pwdMatchValidator(frm: FormGroup) {
    return frm.get('password').value === frm.get('repassword').value
      ? null : {'mismatch': true};
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

  onSubscribe() {
    if(this.form.valid){

      this.isLoading=true;
      this.usersService.subscribe(this.form.value['username'],this.form.value['password'],this.form.value['name'],
        this.form.value['description'],this.form.value['contry'].alpha3Code,this.form.value['city'],this.form.value['adress'],
        this.form.value['postalCode'], this.form.value['category']).subscribe(
        (res)=>{
          this.isLoading=false;
          this.mode="success"
        },
        (error)=>{
          this.isLoading=false;
          this.errorMessage = error.error.message
        }

      )
    }
  }
}
