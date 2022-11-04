import { Component, EventEmitter, Input, Output } from '@angular/core'
import { OfficeMember } from '../../models/office-member.model'
import { UiService } from '../../services/ui.service'
import {
    Action,
    OfficeMemberActionsModalComponent
} from '../modals/office-member-actions-modal/office-member-actions-modal.component'

@Component({
    selector: 'app-office-member-item',
    templateUrl: './office-member-item.component.html',
    styleUrls: ['./office-member-item.component.scss']
})
export class OfficeMemberItemComponent {
    @Input() officeMember: OfficeMember
    @Output() delete: EventEmitter<void> = new EventEmitter<void>()
    @Output() edit: EventEmitter<void> = new EventEmitter<void>()

    constructor(private uiService: UiService) {}

    public openActionsDialog(): void {
        this.uiService.openDialog(
            OfficeMemberActionsModalComponent
        ).afterClosed().subscribe((result: { selectedAction: Action}) => {
            if (result) {
                if (result.selectedAction === Action.Delete) {
                    this.delete.emit()
                    return
                }

                if (result.selectedAction === Action.Edit) {
                    this.edit.emit()
                }
            }
        })
    }
}
