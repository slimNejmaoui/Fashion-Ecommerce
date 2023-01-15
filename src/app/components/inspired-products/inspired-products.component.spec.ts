import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspiredProductsComponent } from './inspired-products.component';

describe('InspiredProductsComponent', () => {
  let component: InspiredProductsComponent;
  let fixture: ComponentFixture<InspiredProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspiredProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspiredProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
