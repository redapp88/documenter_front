import {Component, OnInit} from '@angular/core';
import {Form, FormControl, FormGroup, Validators} from "@angular/forms";
import {SharedService} from "../../services/shared.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean = false;
  errorMessage = "";

  constructor(private sharedService:SharedService,private router:Router,private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.isLoading = false;
    this.errorMessage = "";
    this.form = new FormGroup({
      email: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required, Validators.email]
      }),
      name: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required, Validators.minLength(3)]
      }),

      body: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required, Validators.minLength(30)]
      })


    })

  }


  onSend() {
    if (this.form.valid) {
      this.isLoading = true;
      this.isLoading = true;
      this.sharedService.sendContactMessage(this.form.value['email'], this.form.value['name'], this.form.value['body']).subscribe(
        (res) => {
          this.isLoading = false;
          this.router.navigate(["public/home"])
          this.openSnackBar("Message send successfully","")
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = error.error.message
        }
      )
    }
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      //panelClass: ['blue-snackbar'],
    });
  }
}
