import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MSociedadComponent } from './m-sociedad.component';

describe('MSociedadComponent', () => {
  let component: MSociedadComponent;
  let fixture: ComponentFixture<MSociedadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MSociedadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MSociedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
