import { Component, Input } from '@angular/core'
import { Location } from '@angular/common'

@Component({
    selector: 'app-navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
    @Input() title: string

    constructor(private location: Location) {}

    public navigateBackwards(): void {
        this.location.back()
    }
}
