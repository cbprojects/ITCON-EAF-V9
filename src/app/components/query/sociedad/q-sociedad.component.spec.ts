import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QSociedadComponent } from './q-sociedad.component';

describe('QSociedadComponent', () => {
  let component: QSociedadComponent;
  let fixture: ComponentFixture<QSociedadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QSociedadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QSociedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
