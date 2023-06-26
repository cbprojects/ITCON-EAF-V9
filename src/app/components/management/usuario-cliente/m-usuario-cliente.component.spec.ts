import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MUsuarioClienteComponent } from './m-usuario-cliente.component';

describe('MUsuarioClienteComponent', () => {
  let component: MUsuarioClienteComponent;
  let fixture: ComponentFixture<MUsuarioClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MUsuarioClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MUsuarioClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
