import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeOverviewPageComponent } from './office-overview-page.component';

describe('OfficeOverviewPageComponent', () => {
  let component: OfficeOverviewPageComponent;
  let fixture: ComponentFixture<OfficeOverviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeOverviewPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
