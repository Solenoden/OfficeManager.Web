import { ComponentFixture, TestBed } from '@angular/core/testing'
import { OfficeListPageComponent } from './office-list-page.component'

describe('HomePageComponent', () => {
    let component: OfficeListPageComponent
    let fixture: ComponentFixture<OfficeListPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OfficeListPageComponent]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(OfficeListPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
