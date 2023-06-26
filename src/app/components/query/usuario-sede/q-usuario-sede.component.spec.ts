import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QUsuarioSedeComponent } from './q-usuario-sede.component';

describe('QUsuarioSedeComponent', () => {
  let component: QUsuarioSedeComponent;
  let fixture: ComponentFixture<QUsuarioSedeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QUsuarioSedeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QUsuarioSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
