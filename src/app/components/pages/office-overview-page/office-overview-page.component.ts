import { Component, OnInit } from '@angular/core'
import { Office } from '../../../models/office.model'
import { OfficeService } from '../../../services/office.service'
import { OfficeMember } from '../../../models/office-member.model'
import { Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import { UiService } from '../../../services/ui.service'
import { OfficeMemberService } from '../../../services/office-member.service'
import {
    OfficeMemberDetailsModalComponent
} from '../../modals/office-member-details-modal/office-member-details-modal.component'

@Component({
    selector: 'app-office-overview-page',
    templateUrl: './office-overview-page.component.html',
    styleUrls: ['./office-overview-page.component.scss']
})
export class OfficeOverviewPageComponent implements OnInit {
    public office: Office
    public searchResults: OfficeMember[] = []
    public searchText: string
    private searchTextChange$: Subject<void> = new Subject<void>()

    constructor(
        private officeService: OfficeService,
        private officeMemberService: OfficeMemberService,
        private uiService: UiService
    ) {}

    ngOnInit(): void {
        this.getSelectedOffice()
        this.searchTextChange$.pipe(debounceTime(150)).subscribe(() => this.search())
    }

    private getSelectedOffice(): void {
        this.officeService.getSelectedOffice().subscribe(result => {
            this.office = result
            this.search()
        }, () => {
            this.uiService.displayErrorMessage('loading selected office')
        })
    }

    public search(): void {
        if (!this.searchText) {
            this.searchResults = this.office.officeMembers
            return
        }

        this.searchResults = this.office.officeMembers.filter(officeMember => {
            const fullName = officeMember.firstName + ' ' + officeMember.lastName
            return fullName.toLowerCase().includes(this.searchText.toLowerCase())
        })
    }

    public onSearchTextChange(): void {
        this.searchTextChange$.next()
    }

    public onBackwardsNavigation(): void {
        this.officeService.clearSelectedOfficeId()
    }

    public openOfficeMemberDetailsDialog(officeMemberId?: number): void {
        if (officeMemberId) {
            this.officeMemberService.setSelectedOfficeMemberId(officeMemberId)
        }

        this.uiService.openDialog(OfficeMemberDetailsModalComponent).afterClosed().subscribe(result => {
            this.getSelectedOffice()
        })
    }
}
