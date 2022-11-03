import { ComponentFixture, TestBed } from '@angular/core/testing'
import { OfficeMemberItemComponent } from './office-member-item.component'

describe('OfficeMemberItemComponent', () => {
    let component: OfficeMemberItemComponent
    let fixture: ComponentFixture<OfficeMemberItemComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OfficeMemberItemComponent]
        })
            .compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(OfficeMemberItemComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
