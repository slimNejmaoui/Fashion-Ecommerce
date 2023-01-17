import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProductTabComponent } from './store-product-tab.component';

describe('StoreProductTabComponent', () => {
  let component: StoreProductTabComponent;
  let fixture: ComponentFixture<StoreProductTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreProductTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
