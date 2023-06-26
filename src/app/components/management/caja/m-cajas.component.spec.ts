import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MCajaComponent } from './m-cajas.component';

describe('MCajaComponent', () => {
  let component: MCajaComponent;
  let fixture: ComponentFixture<MCajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MCajaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
