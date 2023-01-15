import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneInspiredComponent } from './one-inspired.component';

describe('OneInspiredComponent', () => {
  let component: OneInspiredComponent;
  let fixture: ComponentFixture<OneInspiredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneInspiredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneInspiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
