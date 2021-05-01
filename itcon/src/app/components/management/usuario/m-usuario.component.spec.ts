import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MUsuarioComponent } from './m-usuario.component';

describe('MUsuario.ComponentComponent', () => {
  let component: MUsuarioComponent;
  let fixture: ComponentFixture<MUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
