import { Injectable } from '@angular/core'
import { HttpService } from './http.service'
import { StateKey, StateService } from './state.service'
import { Observable } from 'rxjs'
import { Office } from '../models/office.model'

@Injectable({ providedIn: 'root' })
export class OfficeService {
    public offices$ = this.stateService.getStateValueStream<Office[]>(StateKey.Offices)
    public get offices(): Office[] {
        return this.stateService.getStateValue<Office[]>(StateKey.Offices)
    }

    public selectedOfficeId$ = this.stateService.getStateValueStream<number>(StateKey.SelectedOfficeId)
    public get selectedOfficeId(): number {
        return this.stateService.getStateValue<number>(StateKey.SelectedOfficeId)
    }

    constructor(
        private httpService: HttpService,
        private stateService: StateService
    ) {}

    public retrieveOffices(): Observable<Office[]> {
        return new Observable<Office[]>(observer => {
            this.httpService.get('/office').subscribe(result => {
                // eslint-disable-next-line no-extra-parens
                const offices = (result as Record<string, unknown>[]).map(currentOffice => new Office(currentOffice))
                this.stateService.setState<Office[]>(StateKey.Offices, offices)

                observer.next(offices)
            }, error => {
                observer.error(error)
            }, () => {
                observer.complete()
            })
        })
    }

    public setSelectedOfficeId(officeId: number): void {
        this.stateService.setState<number>(StateKey.SelectedOfficeId, officeId)
    }

    public getSelectedOffice(): Observable<Office> {
        return new Observable<Office>(observer => {
            if (!this.selectedOfficeId) {
                observer.next(null)
                return
            }

            if (!this.offices || this.offices.length === 0) {
                this.retrieveOffices().subscribe(offices => {
                    observer.next(offices.find(currentOffice => currentOffice.id === this.selectedOfficeId))
                    observer.complete()
                    return
                }, error => {
                    observer.error(error)
                    observer.complete()
                })
                return
            }

            observer.next(this.offices.find(currentOffice => currentOffice.id === this.selectedOfficeId))
            observer.complete()
        })
    }
}