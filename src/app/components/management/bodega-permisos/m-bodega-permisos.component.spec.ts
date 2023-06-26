import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MBodegaPermisosComponent } from './m-bodega-permisos.component';

describe('MBodegaPermisosComponent', () => {
  let component: MBodegaPermisosComponent;
  let fixture: ComponentFixture<MBodegaPermisosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MBodegaPermisosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MBodegaPermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
