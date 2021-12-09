import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {Category} from "../../models/Category.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoriesService} from "../../services/categories.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {
  form: FormGroup;
  errorMessage = "";
  isLoading: boolean = false;
  mode: string = "edit"
  hideCur = true;
  hidePass = true;
  hideRe = true;

  constructor(private authService: AuthService,
              private usersService: UsersService, private _snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit() {
    this.isLoading = false;
    this.errorMessage = "";
    this.mode = "edit"

    this.form = new FormGroup({
      currentPassword: new FormControl('', {
        updateOn: 'change',
        validators: [
          Validators.required,
          Validators.minLength(6)]
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

    })


  }

  pwdMatchValidator(frm: FormGroup) {
    return frm.get('password').value === frm.get('repassword').value
      ? null : {'mismatch': true};
  }

  onEditPassword() {
    if (this.form.valid) {

      this.isLoading = true;
      this.usersService.editPassword(this.authService.curentUser.username, this.form.value['currentPassword'], this.form.value['password'])
        .subscribe(
          (res) => {
            this.isLoading = false;
            this.openSnackBar("Password Edited successfully", "")
            this.mode = "success"
           // this.router.navigate(["/user/dashboard"])
          },
          (error) => {
            console.log(error)
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
