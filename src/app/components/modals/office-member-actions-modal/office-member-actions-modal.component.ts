import { Component } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'

export enum Action {
    Delete = 'Delete',
    Edit = 'Edit'
}

@Component({
    selector: 'app-office-member-actions-modal',
    templateUrl: './office-member-actions-modal.component.html',
    styleUrls: ['./office-member-actions-modal.component.scss']
})
export class OfficeMemberActionsModalComponent {
    public isAttemptingToDelete = false

    constructor(
        private dialogRef: MatDialogRef<OfficeMemberActionsModalComponent>
    ) {}

    public goBackToActions(): void {
        this.isAttemptingToDelete = false
    }

    public displayDeletionConfirmation(): void {
        this.isAttemptingToDelete = true
    }

    public deleteOfficeMember(): void {
        this.dialogRef.close({ selectedAction: Action.Delete })
    }

    public editOfficeMember(): void {
        this.dialogRef.close({ selectedAction: Action.Edit })
    }
}
