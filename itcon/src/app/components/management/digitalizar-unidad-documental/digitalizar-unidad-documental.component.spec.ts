import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalizarUnidadDocumentalComponent } from './digitalizar-unidad-documental.component';

describe('DigitalizarUnidadDocumentalComponent', () => {
  let component: DigitalizarUnidadDocumentalComponent;
  let fixture: ComponentFixture<DigitalizarUnidadDocumentalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalizarUnidadDocumentalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalizarUnidadDocumentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
