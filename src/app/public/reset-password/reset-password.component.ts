import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";
import {AuthService} from "../../services/auth.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  isLoading=false;
  errorMessage="";
  constructor(private usersService:UsersService,
              private authService:AuthService,
              private dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<ResetPasswordComponent>) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.errorMessage = "";
    this.form = new FormGroup({
      username: new FormControl('', {
        updateOn: 'change',
        validators: [
          Validators.required,
          Validators.email]
      }),

    })



  }

  onResetPassword() {
    if (this.form.valid) {

      this.isLoading = true;
      this.usersService.resetPassword(this.form.value['username'])
        .subscribe(
          (res) => {
            this.isLoading = false;
            this.openSnackBar("Password Reset Request send successfully to your Emai adress", "")
            // this.router.navigate(["/user/dashboard"])
            this.dialogRef.close('success');
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
