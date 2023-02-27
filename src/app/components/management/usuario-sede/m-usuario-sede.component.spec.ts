import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MUsuarioSedeComponent } from './m-usuario-sede.component';

describe('MUsuarioSedeComponent', () => {
  let component: MUsuarioSedeComponent;
  let fixture: ComponentFixture<MUsuarioSedeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MUsuarioSedeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MUsuarioSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
