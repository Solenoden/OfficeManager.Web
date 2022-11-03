import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Location } from '@angular/common'

@Component({
    selector: 'app-navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
    @Input() title: string
    @Output() onBackwardsNavigation: EventEmitter<void> = new EventEmitter<void>()

    constructor(private location: Location) {}

    public navigateBackwards(): void {
        this.onBackwardsNavigation.emit()
        this.location.back()
    }
}
