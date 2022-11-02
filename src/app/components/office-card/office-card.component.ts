import { Component, Input } from '@angular/core'
import { Office } from '../../models/office.model'

@Component({
    selector: 'app-office-card',
    templateUrl: './office-card.component.html',
    styleUrls: ['./office-card.component.scss']
})
export class OfficeCardComponent {
    @Input() office: Office

    public isCardExpanded = false

    public toggleCard(): void {
        this.isCardExpanded = !this.isCardExpanded
    }
}
