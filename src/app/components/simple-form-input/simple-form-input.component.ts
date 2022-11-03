import { Component, Input, OnChanges, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'

@Component({
    selector: 'app-simple-form-input',
    templateUrl: './simple-form-input.component.html',
    styleUrls: ['./simple-form-input.component.scss']
})
export class SimpleFormInputComponent {
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('control') formControl: FormControl
    @Input() displayName: string
    @Input() type = 'text'
    @Input() hasBeenSubmitted: boolean

    public getErrorMessage(): string {
        // TODO: Extract error message logic to a service
        if (this.formControl.errors.required) {
            return this.displayName ? this.displayName + ' is required' : 'This field is required'
        }

        return 'Please provide a valid ' + (this.displayName ? this.displayName : 'value')
    }
}
