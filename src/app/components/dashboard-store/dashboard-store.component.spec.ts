import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStoreComponent } from './dashboard-store.component';

describe('DashboardStoreComponent', () => {
  let component: DashboardStoreComponent;
  let fixture: ComponentFixture<DashboardStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
