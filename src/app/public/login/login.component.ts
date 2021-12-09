import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ImagesGalleryComponent} from "../../user/documents-user/images-gallery/images-gallery.component";
import {ResetPasswordComponent} from "../reset-password/reset-password.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage = ""
  hide = true;
  form: FormGroup;
  isLoading: boolean=false;

  constructor(private authService: AuthService,
              private router: Router,
              public dialog: MatDialog,private _snackBar: MatSnackBar) {
  }



  ngOnInit() {

    this.form = new FormGroup({
      email: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required,
          Validators.email]
      }),
      password: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required,
          Validators.minLength(6)]
      }),


    })
    if (this.authService.curentUser)
      this.roleRedirecte();
    else {
      this.authService.autoLogin().subscribe(
        (resData) => {
          if (resData) {
            this.roleRedirecte();
          }
        }
      )
    }
  }
public onLogin(){
    if(this.form.valid){
    this.login(this.form.value['email'],this.form.value['password'])
    }
}

  private login(username: string, password: string) {
    this.isLoading=true;
    this.authService.login(username, password).subscribe(
      () => {
      },
      (error) => {

       // console.log(error)
        this.isLoading=false;
        this.errorMessage =this.authCodeToError( error.error.error)
      },
      () => {
        this.isLoading=false;
        this.roleRedirecte();

      })
  }



  private authCodeToError(message: string) {
    if (message === 'Unauthorized')
      return "Unauthorized"

    else {
      return 'Auth_error'
    }

  }

  private roleRedirecte() {
    if (this.authService.isUser())
      this.router.navigate(['user/dashboard']);
    else if (this.authService.isManager())
      this.router.navigate(['adminArea']);
  }

  loginValid() {
    return (this.form.controls.username.valid && this.form.controls.password.valid);
  }

  onGoForgetPassword() {
    this.router.navigate(["/forgetPassword"])
  }

  onResetPassword() {

      const dialogRef = this.dialog.open(ResetPasswordComponent, {
        data: {},
        width: '60%',
      })
  }
}
