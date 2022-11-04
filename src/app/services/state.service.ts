import { Subject } from 'rxjs'
import { Office } from '../models/office.model'
import { Injectable } from '@angular/core'

export enum StateKey {
    Offices = 'offices',
    SelectedOfficeId = 'selectedOfficeId',
    SelectedOfficeMemberId = 'selectedOfficeMemberId'
}

export interface StateItem<StateType> { currentValue: StateType, valueStream: Subject<StateType> }

@Injectable({ providedIn: 'root' })
export class StateService {
    private state: { [key in StateKey]: StateItem<any> } = {
        [StateKey.Offices]: this.buildStateItem<Office[]>([]),
        [StateKey.SelectedOfficeId]: this.buildStateItem<number>(null),
        [StateKey.SelectedOfficeMemberId]: this.buildStateItem<number>(null),
    }

    public setState<StateType>(stateKey: StateKey, newValue: StateType): void {
        const stateItem = this.state[stateKey]
        stateItem.currentValue = newValue
        stateItem.valueStream.next(newValue)
    }

    public getStateValue<StateType>(stateKey: StateKey): StateType {
        const stateItem = this.state[stateKey]
        return stateItem?.currentValue as StateType
    }

    public getStateValueStream<StateType>(stateKey: StateKey): Subject<StateType> {
        const stateItem = this.state[stateKey]
        return stateItem?.valueStream as Subject<StateType>
    }

    private buildStateItem<StateType>(initialValue: StateType): StateItem<StateType> {
        const valueStream = new Subject<StateType>()
        valueStream.next(initialValue)
        return { currentValue: initialValue, valueStream }
    }
}