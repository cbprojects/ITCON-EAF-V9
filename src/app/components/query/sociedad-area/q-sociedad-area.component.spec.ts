import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QSociedadAreaComponent } from './q-sociedad-area.component';

describe('QSociedadAreaComponent', () => {
  let component: QSociedadAreaComponent;
  let fixture: ComponentFixture<QSociedadAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QSociedadAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QSociedadAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
