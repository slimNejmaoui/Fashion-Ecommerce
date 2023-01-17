import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCommandeTabComponent } from './store-commande-tab.component';

describe('StoreCommandeTabComponent', () => {
  let component: StoreCommandeTabComponent;
  let fixture: ComponentFixture<StoreCommandeTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCommandeTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCommandeTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
