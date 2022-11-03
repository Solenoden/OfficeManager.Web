import { FormControl } from '@angular/forms'
import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class ValidationService {
    private readonly formControlNameStringVariable = '$formControlName'
    private validationErrors: { [key: string]: { default: string, includingFormControlName: string } } = {
        required: {
            default: 'This field is required',
            includingFormControlName: `${this.formControlNameStringVariable} is required`
        }
    }

    public getFormControlErrorMessage(formControl: FormControl, formControlDisplayName: string): string {
        const firstError = Object.keys(formControl.errors).filter(key => !!formControl.errors[key])[0]
        const validationError = this.validationErrors[firstError]

        if (validationError) {
            return formControlDisplayName ?
                validationError.includingFormControlName.replace(
                    this.formControlNameStringVariable,
                    formControlDisplayName
                ) :
                validationError.default
        }

        return 'Please provide a valid ' + (formControlDisplayName ? formControlDisplayName : 'value')
    }
}