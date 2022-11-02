import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { OfficeListPageComponent } from './components/pages/home-page/office-list-page.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatIconModule } from '@angular/material/icon'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatBottomSheetModule } from '@angular/material/bottom-sheet'
import { MatDialogModule } from '@angular/material/dialog';
import { OfficeCardComponent } from './components/office-card/office-card.component';

@NgModule({
    declarations: [
        AppComponent,
        OfficeListPageComponent,
        OfficeCardComponent
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
        MatBottomSheetModule,
        MatDialogModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
