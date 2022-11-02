import { Injectable } from '@angular/core'
import { HttpService } from './http.service'
import { StateKey, StateService } from './state.service'
import { Observable } from 'rxjs'
import { Office } from '../models/office.model'

@Injectable({ providedIn: 'root' })
export class OfficeService {
    public offices$ = this.stateService.getStateValueStream<Office[]>(StateKey.Offices)

    constructor(
        private httpService: HttpService,
        private stateService: StateService
    ) {}

    public retrieveOffices(): Observable<Office[]> {
        return new Observable<Office[]>(observer => {
            this.httpService.get('/office').subscribe(result => {
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
}