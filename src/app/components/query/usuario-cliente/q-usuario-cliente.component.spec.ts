import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QUsuarioClienteComponent } from './q-usuario-cliente.component';

describe('QUsuarioClienteComponent', () => {
  let component: QUsuarioClienteComponent;
  let fixture: ComponentFixture<QUsuarioClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QUsuarioClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QUsuarioClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
