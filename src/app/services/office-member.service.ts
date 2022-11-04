import { Injectable } from '@angular/core'
import { StateKey, StateService } from './state.service'
import { Observable } from 'rxjs'
import { OfficeService } from './office.service'
import { OfficeMember } from '../models/office-member.model'
import { HttpService } from './http.service'

@Injectable({ providedIn: 'root' })
export class OfficeMemberService {
    public selectedOfficeMemberId$ = this.stateService.getStateValueStream<number>(StateKey.SelectedOfficeMemberId)
    public get selectedOfficeMemberId(): number {
        return this.stateService.getStateValue<number>(StateKey.SelectedOfficeMemberId)
    }

    constructor(
        private stateService: StateService,
        private officeService: OfficeService,
        private httpService: HttpService
    ) {}

    public createOfficeMember(officeId: number, officeMember: OfficeMember): Observable<void> {
        return new Observable<void>(observer => {
            const requestBody = { ...officeMember, officeId }
            this.httpService.put('/office-member', requestBody).subscribe(() => {
                // TODO: Mutate the app state instead of making a http call to retrieve all offices again
                this.officeService.retrieveOffices().subscribe(() => {
                    observer.next()
                    observer.complete()
                }, error => {
                    observer.error(error)
                })
            }, error => {
                observer.error(error)
            })
        })
    }

    public updateOfficeMember(officeId: number, officeMemberId: number, officeMember: OfficeMember): Observable<void> {
        return new Observable<void>(observer => {
            const requestBody = { ...officeMember, officeId }
            this.httpService.patch('/office-member/' + officeMemberId, requestBody).subscribe(() => {
                // TODO: Mutate the app state instead of making a http call to retrieve all offices again
                this.officeService.retrieveOffices().subscribe(() => {
                    observer.next()
                    observer.complete()
                }, error => {
                    observer.error(error)
                })
            }, error => {
                observer.error(error)
            })
        })
    }

    public setSelectedOfficeMemberId(officeMemberId: number): void {
        this.stateService.setState<number>(StateKey.SelectedOfficeMemberId, officeMemberId)
    }

    public clearSelectedOfficeMemberId(): void {
        this.stateService.setState<number>(StateKey.SelectedOfficeMemberId, null)
    }

    public getSelectedOfficeMember(): Observable<OfficeMember> {
        return new Observable<OfficeMember>(observer => {
            if (!this.selectedOfficeMemberId) {
                observer.next(null)
                observer.complete()
                return
            }

            for (const office of this.officeService.offices) {
                const selectedOfficeMember = office.officeMembers?.find(
                    officeMember => officeMember.id === this.selectedOfficeMemberId
                )
                if (selectedOfficeMember) {
                    observer.next(selectedOfficeMember)
                    observer.complete()
                    return
                }
            }

            observer.next(null)
            observer.complete()
        })
    }

    public getAvatarIds(): Observable<number[]> {
        // TODO: Retrieve possible avatars from the API
        return new Observable<number[]>(observer => {
            observer.next([1, 2, 3, 4, 5, 6, 7])
            observer.complete()
        })
    }
}