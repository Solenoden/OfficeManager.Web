import { Component, Input } from '@angular/core'
import { Office } from '../../models/office.model'
import { Router } from '@angular/router'
import { OfficeService } from '../../services/office.service'

@Component({
    selector: 'app-office-card',
    templateUrl: './office-card.component.html',
    styleUrls: ['./office-card.component.scss']
})
export class OfficeCardComponent {
    @Input() office: Office
    @Input() shouldSelectOffice: boolean

    public isCardExpanded = false

    constructor(
        private router: Router,
        private officeService: OfficeService
    ) {}

    public toggleCard(): void {
        this.isCardExpanded = !this.isCardExpanded
    }

    public editOffice(): void {
        if (this.shouldSelectOffice) {
            this.officeService.setSelectedOfficeId(this.office.id)
            void this.router.navigate(['/office/overview'])
        }
    }
}
