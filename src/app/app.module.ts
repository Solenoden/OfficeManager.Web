import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { OfficeListPageComponent } from './components/pages/office-list-page/office-list-page.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatIconModule } from '@angular/material/icon'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatBottomSheetModule } from '@angular/material/bottom-sheet'
import { MatDialogModule } from '@angular/material/dialog'
import { OfficeCardComponent } from './components/office-card/office-card.component'
import { OfficeOverviewPageComponent } from './components/pages/office-overview-page/office-overview-page.component'
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component'
import { OfficeMemberItemComponent } from './components/office-member-item/office-member-item.component';
import { OfficeDetailsPageComponent } from './components/pages/office-details-page/office-details-page.component'
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { SimpleFormInputComponent } from './components/simple-form-input/simple-form-input.component'
import { MatSnackBarModule } from '@angular/material/snack-bar'

@NgModule({
    declarations: [
        AppComponent,
        OfficeListPageComponent,
        OfficeCardComponent,
        OfficeOverviewPageComponent,
        NavigationBarComponent,
        OfficeMemberItemComponent,
        OfficeDetailsPageComponent,
        SimpleFormInputComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatIconModule,
        HttpClientModule,
        FormsModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        MatSnackBarModule,
        ReactiveFormsModule
    ],
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' }}
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
