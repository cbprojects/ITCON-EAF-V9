import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QUnidadDocumentalAdmComponent } from './q-unidad-documental-adm.component';

describe('QUnidadDocumentalAdmComponent', () => {
  let component: QUnidadDocumentalAdmComponent;
  let fixture: ComponentFixture<QUnidadDocumentalAdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QUnidadDocumentalAdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QUnidadDocumentalAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});