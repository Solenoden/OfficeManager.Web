import { Component, Input } from '@angular/core'
import { FormControl } from '@angular/forms'
import { ValidationService } from '../../services/validation.service'

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

    constructor(public validationService: ValidationService) {}

    public get errorMessage(): string {
        return this.validationService.getFormControlErrorMessage(this.formControl, this.displayName)
    }
}
