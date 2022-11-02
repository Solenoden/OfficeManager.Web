import { Component, OnInit } from '@angular/core'
import { Office } from '../../../models/office.model'
import { OfficeService } from '../../../services/office.service'

@Component({
    selector: 'app-office-overview-page',
    templateUrl: './office-overview-page.component.html',
    styleUrls: ['./office-overview-page.component.scss']
})
export class OfficeOverviewPageComponent implements OnInit {
    public office: Office

    constructor(
        private officeService: OfficeService
    ) {}

    ngOnInit(): void {
        this.getSelectedOffice()
    }

    private getSelectedOffice(): void {
        // TODO: Add error handling
        this.officeService.getSelectedOffice().subscribe(result => {
            this.office = result
        })
    }
}
