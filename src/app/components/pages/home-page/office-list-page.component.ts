import { Component, OnInit } from '@angular/core'
import { Office } from '../../../models/office.model'
import { OfficeService } from '../../../services/office.service'

@Component({
    selector: 'app-office-list-page',
    templateUrl: './office-list-page.component.html',
    styleUrls: ['./office-list-page.component.scss']
})
export class OfficeListPageComponent implements OnInit {
    public offices: Office[] = []

    constructor(private officeService: OfficeService) {}

    ngOnInit(): void {
        this.getOffices()
    }

    private getOffices(): void {
        this.officeService.offices$.subscribe(result => this.offices = result)
        this.officeService.retrieveOffices().subscribe()
    }
}
