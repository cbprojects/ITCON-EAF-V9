import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MParametrizacionesComponent } from './m-parametrizaciones.component';

describe('MParametrizacionesComponent', () => {
  let component: MParametrizacionesComponent;
  let fixture: ComponentFixture<MParametrizacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MParametrizacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MParametrizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
