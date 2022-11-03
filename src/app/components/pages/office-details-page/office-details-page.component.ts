import { Component, OnInit } from '@angular/core'
import { OfficeService } from '../../../services/office.service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Office } from '../../../models/office.model'
import { Router } from '@angular/router'
import { UiService } from '../../../services/ui.service'
import { ValidationService } from '../../../services/validation.service'

enum FormField {
    Id = 'id',
    Name = 'name',
    Address = 'address',
    EmailAddress = 'emailAddress',
    PhoneNumber = 'phoneNumber',
    MaximumCapacity = 'maximumCapacity',
    Colour = 'colour'
}

@Component({
    selector: 'app-office-details-page',
    templateUrl: './office-details-page.component.html',
    styleUrls: ['./office-details-page.component.scss']
})
export class OfficeDetailsPageComponent implements OnInit {
    public readonly FormField = FormField

    public isNewOffice: boolean
    public officeForm: FormGroup
    public hasFormBeenSubmitted = false
    public navbarTitle: string
    public possibleColours: string[]

    constructor(
        private officeService: OfficeService,
        private formBuilder: FormBuilder,
        private router: Router,
        private uiService: UiService,
        public validationService: ValidationService
    ) {}

    ngOnInit(): void {
        this.getOfficeColours()
        this.getOffice()
    }

    private getOfficeColours(): void {
        this.officeService.getOfficeColours().subscribe(result => {
            this.possibleColours = result
        }, () => {
            this.uiService.displayErrorMessage('loading the selected office')
        })
    }

    private getOffice(): void {
        this.officeService.getSelectedOffice().subscribe(result => {
            this.isNewOffice = !result
            this.navbarTitle = this.isNewOffice ? 'New Office' : 'Edit Office'

            this.officeForm = this.formBuilder.group({
                [this.FormField.Id]: [result?.id],
                [this.FormField.Name]: [result?.name, Validators.required],
                [this.FormField.Address]: [result?.address, Validators.required],
                [this.FormField.EmailAddress]: [result?.emailAddress, Validators.required],
                [this.FormField.PhoneNumber]: [result?.phoneNumber, Validators.required],
                [this.FormField.MaximumCapacity]: [result?.maximumCapacity, Validators.required],
                [this.FormField.Colour]: [result?.colour, Validators.required]
            })
        }, () => {
            this.uiService.displayErrorMessage('loading the selected office')
        })
    }

    public getFormControl(formField: FormField): FormControl {
        return this.officeForm.get(formField) as FormControl
    }

    public selectColour(colourName: string): void {
        this.getFormControl(FormField.Colour).setValue(colourName)
    }

    public deleteOffice(): void {
        const officeId = this.getFormControl(FormField.Id).value as number

        this.officeService.deleteOffice(officeId).subscribe(() => {
            void this.router.navigate(['..'])
            this.uiService.displayInformationMessage('Office successfully deleted')
        }, () => {
            this.uiService.displayErrorMessage('creating/updating the office')
        })
    }

    public onSubmit(): void {
        this.hasFormBeenSubmitted = true
        this.officeForm.updateValueAndValidity()

        if (this.officeForm.valid) {
            const office = new Office(this.officeForm.value)
            const observable = this.isNewOffice ?
                this.officeService.createOffice(office) :
                this.officeService.updateOffice(office.id, office)

            observable.subscribe(() => {
                void this.router.navigate(['..'])
                this.uiService.displayInformationMessage(
                    'Office successfully ' + (this.isNewOffice ? 'created' : 'updated') + '.'
                )
            }, () => {
                this.uiService.displayErrorMessage('creating/updating the office')
            })
        } else {
            this.uiService.scrollToPageTop()
        }
    }
}
