import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QCajaComponent } from './q-cajas.component';

describe('QCajaComponent', () => {
  let component: QCajaComponent;
  let fixture: ComponentFixture<QCajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QCajaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
