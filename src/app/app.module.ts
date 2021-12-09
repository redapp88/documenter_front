import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './public/body/header/header.component';
import {FooterComponent} from './public/body/footer/footer.component';
import {DocSearchAreaComponent} from './public/doc-search-area/doc-search-area.component';
import {LoginComponent} from './public/login/login.component';
import {SubscribeComponent} from './public/subscribe/subscribe.component';
import {DocVerifyPublicComponent} from './public/doc-verify-public/doc-verify-public.component';
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from "@angular/material/core";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from "@angular/forms";
import {MatSliderModule} from "@angular/material/slider";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {DocumentsUserComponent} from './user/documents-user/documents-user.component';
import {HeaderUserComponent} from "./user/body/header-user/header-user.component";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectCountryModule} from '@angular-material-extensions/select-country';
import {MatSelectModule} from "@angular/material/select";
import { LeftSidebarComponent } from './user/body/left-sidebar/left-sidebar.component';
import { FoldersUserComponent } from './user/folders-user/folders-user.component';
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import { AddFolderComponent } from './user/folders-user/add-folder/add-folder.component';
import { EditFolderComponent } from './user/folders-user/edit-folder/edit-folder.component';
import { DeleteFolderComponent } from './user/folders-user/delete-folder/delete-folder.component';
import { ProfileComponent } from './user/profile/profile.component';
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { AddDocumentComponent } from './user/documents-user/add-document/add-document.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { DeleteDocumentsComponent } from './user/documents-user/delete-documents/delete-documents.component';
import { EditDocumentComponent } from './user/documents-user/edit-document/edit-document.component';
import { ImageMaximizeComponent } from './user/documents-user/image-maximize/image-maximize.component';
import { ImagesGalleryComponent } from './user/documents-user/images-gallery/images-gallery.component';
import {NgxPrintModule} from "ngx-print";
import { DashboardUserComponent } from './user/dashboard-user/dashboard-user.component';
import { EditPasswordComponent } from './user/edit-password/edit-password.component';
import { ConfirmLogoutComponent } from './user/body/left-sidebar/confirm-logout/confirm-logout.component';
import { GoogleChartsModule } from 'angular-google-charts';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { AlertMessageComponent } from './shared/alert-message/alert-message.component';
import { ResetPasswordComponent } from './public/reset-password/reset-password.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {NgxLanguageSelectorModule} from "ngx-language-selector";
import { LangSwitcherComponent } from './shared/lang-switcher/lang-switcher.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDividerModule} from "@angular/material/divider";
import { LeftSidebar2Component } from './user/body/left-sidebar2/left-sidebar2.component';
import {SidebarMenuModule} from "angular-sidebar-menu";
import {MatListModule} from "@angular/material/list";
import {FlexLayoutModule} from "@angular/flex-layout";
import { AppGuideComponent } from './public/app-guide/app-guide.component';
import { ContactComponent } from './public/contact/contact.component';
import { AboutComponent } from './public/about/about.component';
import {MatTabsModule} from "@angular/material/tabs";
import { TermsComponent } from './public/body/terms/terms.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DocSearchAreaComponent,
    LoginComponent,
    SubscribeComponent,
    DocVerifyPublicComponent,
    HeaderUserComponent,
    DocumentsUserComponent,
    LeftSidebarComponent,
    FoldersUserComponent,
    AddFolderComponent,
    EditFolderComponent,
    DeleteFolderComponent,
    ProfileComponent,
    AddDocumentComponent,
    DeleteDocumentsComponent,
    EditDocumentComponent,
    ImageMaximizeComponent,
    ImagesGalleryComponent,
    DashboardUserComponent,
    EditPasswordComponent,
    ConfirmLogoutComponent,
    AlertMessageComponent,
    ResetPasswordComponent,
    LangSwitcherComponent,
    LeftSidebar2Component,
    AppGuideComponent,
    ContactComponent,
    AboutComponent,
    TermsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule,
    MatProgressBarModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTableModule,
    MatCheckboxModule,
    MatSnackBarModule,
    NgxPrintModule,
    GoogleChartsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    SidebarMenuModule,
    MatListModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatTabsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatSelectCountryModule.forRoot('en')

  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}
