import { Component, OnInit } from '@angular/core'
import { OfficeMemberService } from '../../../services/office-member.service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { UiService } from '../../../services/ui.service'
import { MatDialogRef } from '@angular/material/dialog'
import { OfficeMember } from '../../../models/office-member.model'
import { ValidationService } from '../../../services/validation.service'
import { OfficeService } from '../../../services/office.service'

enum FormField {
    Id = 'id',
    FirstName = 'firstName',
    LastName = 'lastName',
    AvatarId = 'avatarId'
}

enum FormStep {
    PersonalInfo = 'Personal Info',
    AvatarSelection = 'Avatar Selection'
}

@Component({
    selector: 'app-office-member-details-modal',
    templateUrl: './office-member-details-modal.component.html',
    styleUrls: ['./office-member-details-modal.component.scss']
})
export class OfficeMemberDetailsModalComponent implements OnInit {
    public readonly FormField = FormField
    public readonly FormStep = FormStep

    public isNewOfficeMember: boolean
    public officeMemberForms: { step: FormStep, form: FormGroup, hasBeenSubmitted: boolean }[] = []
    public possibleAvatarIds: number[] = []
    public currentStepIndex = 0
    public formSteps: FormStep[] = [FormStep.PersonalInfo, FormStep.AvatarSelection]

    public get currentFormStep(): FormStep { return this.formSteps[this.currentStepIndex] }
    public get isOnLastFormStep(): boolean { return this.currentStepIndex === this.formSteps.length - 1 }

    constructor(
        private dialogRef: MatDialogRef<OfficeMemberDetailsModalComponent>,
        private officeMemberService: OfficeMemberService,
        private officeService: OfficeService,
        private formBuilder: FormBuilder,
        private uiService: UiService,
        public validationService: ValidationService
    ) {}

    ngOnInit(): void {
        this.prepareForms()
        this.getPossibleAvatarIds()
        this.getOfficeMember()
    }

    private prepareForms(): void {
        this.officeMemberForms.push({
            step: FormStep.PersonalInfo,
            hasBeenSubmitted: false,
            form: this.formBuilder.group({
                [FormField.Id]: [null],
                [FormField.FirstName]: [null, Validators.required],
                [FormField.LastName]: [null, Validators.required],
            })
        })
        this.officeMemberForms.push({
            step: FormStep.AvatarSelection,
            hasBeenSubmitted: false,
            form: this.formBuilder.group({
                [FormField.AvatarId]: [null, Validators.required]
            })
        })
    }

    public getFormControl(formField: FormField): FormControl {
        for (const formInfo of this.officeMemberForms) {
            const formControl = formInfo.form.get(formField)
            if (formControl) return formControl as FormControl
        }

        return null
    }

    public getFormInfo(formStep: FormStep): { step: FormStep, form: FormGroup, hasBeenSubmitted: boolean } {
        return this.officeMemberForms.find(current => current.step === formStep)
    }

    private getOfficeMember(): void {
        this.officeMemberService.getSelectedOfficeMember().subscribe(result => {
            this.isNewOfficeMember = !result

            if (!this.isNewOfficeMember) {
                this.getFormControl(FormField.Id)?.patchValue(result.id)
                this.getFormControl(FormField.FirstName)?.patchValue(result.firstName)
                this.getFormControl(FormField.LastName)?.patchValue(result.lastName)
                this.getFormControl(FormField.AvatarId)?.patchValue(result.avatarId)
            }
        }, () => {
            this.uiService.displayErrorMessage('loading the staff member')
        })
    }

    private getOfficeMemberFromForms(): OfficeMember {
        let formValues = {}
        this.officeMemberForms.forEach(current => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            formValues = { ...formValues, ...current.form.value }
        })

        return new OfficeMember(formValues)
    }

    private getPossibleAvatarIds(): void {
        this.officeMemberService.getAvatarIds().subscribe(result => {
            this.possibleAvatarIds = result
        }, error => {
            this.uiService.displayErrorMessage('loading the staff member')
        })
    }

    public selectAvatar(avatarId: number): void {
        this.getFormControl(FormField.AvatarId).setValue(avatarId)
    }

    public closeModal(isSuccessful: boolean): void {
        this.dialogRef.close(isSuccessful)
    }

    public stepBack(): void {
        if (this.currentStepIndex !== 0) this.currentStepIndex--
    }

    public stepForward(): void {
        if (this.isOnLastFormStep) {
            this.onSubmit()
            return
        }

        const currentFormInfo = this.officeMemberForms.find(current => current.step === this.currentFormStep)
        currentFormInfo.hasBeenSubmitted = true

        if (currentFormInfo.form.valid) {
            this.currentStepIndex++
        }
    }

    public onSubmit(): void {
        this.officeMemberForms.forEach(current => current.hasBeenSubmitted = true)
        for (const formInfo of this.officeMemberForms) {
            if (formInfo.form.invalid) return
        }

        const officeId = this.officeService.selectedOfficeId
        const officeMember = this.getOfficeMemberFromForms()
        const observable = this.isNewOfficeMember ?
            this.officeMemberService.createOfficeMember(officeId, officeMember) :
            this.officeMemberService.updateOfficeMember(officeId, officeMember.id, officeMember)

        observable.subscribe(() => {
            this.closeModal(true)
            this.uiService.displayInformationMessage(
                'Staff member successfully ' + (this.isNewOfficeMember ? 'created' : 'updated') + '.'
            )
        }, () => {
            this.uiService.displayErrorMessage('creating/updating the staff member')
        })
    }
}
