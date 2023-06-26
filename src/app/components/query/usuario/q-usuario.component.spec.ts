import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QUsuarioComponent } from './q-usuario.component';

describe('QUsuariosComponent', () => {
  let component: QUsuarioComponent;
  let fixture: ComponentFixture<QUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
