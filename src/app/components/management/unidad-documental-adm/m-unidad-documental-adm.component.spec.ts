import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MUnidadDocumentalAdmComponent } from './m-unidad-documental-adm.component';

describe('MUnidadDocumentalAdmComponent', () => {
  let component: MUnidadDocumentalAdmComponent;
  let fixture: ComponentFixture<MUnidadDocumentalAdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MUnidadDocumentalAdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MUnidadDocumentalAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
