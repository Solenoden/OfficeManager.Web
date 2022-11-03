import { Component, Input } from '@angular/core'
import { OfficeMember } from '../../models/office-member.model'

@Component({
    selector: 'app-office-member-item',
    templateUrl: './office-member-item.component.html',
    styleUrls: ['./office-member-item.component.scss']
})
export class OfficeMemberItemComponent {
    @Input() officeMember: OfficeMember
}
