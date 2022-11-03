import { Component, OnInit } from '@angular/core'
import { Office } from '../../../models/office.model'
import { OfficeService } from '../../../services/office.service'
import { OfficeMember } from '../../../models/office-member.model'
import { Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'

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
        private officeService: OfficeService
    ) {}

    ngOnInit(): void {
        this.getSelectedOffice()
        this.searchTextChange$.pipe(debounceTime(150)).subscribe(() => this.search())
    }

    private getSelectedOffice(): void {
        // TODO: Add error handling
        this.officeService.getSelectedOffice().subscribe(result => {
            this.office = result
            this.search()
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
}
