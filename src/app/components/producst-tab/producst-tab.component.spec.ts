import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducstTabComponent } from './producst-tab.component';

describe('ProducstTabComponent', () => {
  let component: ProducstTabComponent;
  let fixture: ComponentFixture<ProducstTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducstTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducstTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
