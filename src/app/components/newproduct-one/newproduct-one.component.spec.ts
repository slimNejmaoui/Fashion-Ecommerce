import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewproductOneComponent } from './newproduct-one.component';

describe('NewproductOneComponent', () => {
  let component: NewproductOneComponent;
  let fixture: ComponentFixture<NewproductOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewproductOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewproductOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
