import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MUnidadDocumentalComponent } from './m-unidad-documental.component';

describe('MUnidadDocumentalComponent', () => {
  let component: MUnidadDocumentalComponent;
  let fixture: ComponentFixture<MUnidadDocumentalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MUnidadDocumentalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MUnidadDocumentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
