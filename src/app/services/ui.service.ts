import { Injectable, NgZone } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { ComponentType } from '@angular/cdk/overlay'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({ providedIn: 'root' })
export class UiService {
    private readonly defaultUnexpectedErrorMessage = 'An unexpected error occurred, please try again later.'

    constructor(
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private ngZone: NgZone
    ) {}

    public openDialog<T>(component: ComponentType<T>, data: Record<string, unknown>): MatDialogRef<any> {
        return this.dialog.open(component, { data })
    }

    public displayErrorMessage(activityInContinuousPresentTense?: string, messageOverride?: string): void {
        let text = this.defaultUnexpectedErrorMessage
        if (messageOverride) {
            text = messageOverride
        } else if (activityInContinuousPresentTense) {
            text = `An unexpected error occurred while ${activityInContinuousPresentTense.toLowerCase()}. Please try again later.`
        }
        this.snackBar.open(text, 'OK', { panelClass: ['toast', 'toast-error'] })
    }

    public displayInformationMessage(text: string): void {
        this.snackBar.open(text, 'OK', { panelClass: ['toast', 'toast-information'] })
    }

    public scrollToPageTop(pixelDistanceFromTop = 0): void {
        this.ngZone.runOutsideAngular(() => window.scrollTo({ top: pixelDistanceFromTop, behavior: 'smooth' }))
    }
}