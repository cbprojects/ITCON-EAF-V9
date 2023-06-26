import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QBodegaPermisosComponent } from './q-bodega-permisos.component';

describe('QBodegaPermisosComponent', () => {
  let component: QBodegaPermisosComponent;
  let fixture: ComponentFixture<QBodegaPermisosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QBodegaPermisosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QBodegaPermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
