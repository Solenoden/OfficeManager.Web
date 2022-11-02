import { Subject } from 'rxjs'
import { Office } from '../models/office.model'
import { Injectable } from '@angular/core'

export enum StateKey {
    Offices = 'offices'
}

export interface StateItem<StateType> { currentValue: StateType, valueStream: Subject<StateType> }

@Injectable({ providedIn: 'root' })
export class StateService {
    private state: { [key in StateKey]: StateItem<any> } = {
        [StateKey.Offices]: this.buildStateItem<Office[]>([])
    }

    public setState<StateType>(stateKey: StateKey, newValue: StateType): void {
        const stateItem = this.state[stateKey]
        stateItem.currentValue = newValue
        stateItem.valueStream.next(newValue)
    }

    public getStateValue<StateType>(stateKey: StateKey): StateType {
        const stateItem = this.state[stateKey]
        return stateItem?.currentValue
    }

    public getStateValueStream<StateType>(stateKey: StateKey): Subject<StateType> {
        const stateItem = this.state[stateKey]
        return stateItem?.valueStream
    }

    private buildStateItem<StateType>(initialValue: StateType): StateItem<StateType> {
        const valueStream = new Subject<StateType>()
        valueStream.next(initialValue)
        return { currentValue: initialValue, valueStream }
    }
}