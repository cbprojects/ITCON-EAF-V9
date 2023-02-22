import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolPerfilComponent } from './rol-perfil.component';

describe('RolPerfilComponent', () => {
  let component: RolPerfilComponent;
  let fixture: ComponentFixture<RolPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
