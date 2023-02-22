import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrasladoUnidadDocumentalComponent } from './traslado-unidad-documental.component';

describe('TrasladoUnidadDocumentalComponent', () => {
  let component: TrasladoUnidadDocumentalComponent;
  let fixture: ComponentFixture<TrasladoUnidadDocumentalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrasladoUnidadDocumentalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrasladoUnidadDocumentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
