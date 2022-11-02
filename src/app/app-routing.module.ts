import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { OfficeListPageComponent } from './components/pages/home-page/office-list-page.component'

const routes: Routes = [
    {
        path: '',
        component: OfficeListPageComponent
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled',
            anchorScrolling: 'enabled',
            scrollOffset: [0, 30],
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
