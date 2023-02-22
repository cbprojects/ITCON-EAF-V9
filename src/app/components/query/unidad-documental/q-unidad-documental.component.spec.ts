import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QUnidadDocumentalComponent } from './q-unidad-documental.component';

describe('QUnidadDocumentalComponent', () => {
  let component: QUnidadDocumentalComponent;
  let fixture: ComponentFixture<QUnidadDocumentalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QUnidadDocumentalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QUnidadDocumentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
