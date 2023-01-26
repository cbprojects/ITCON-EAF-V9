import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QParametrizacionesComponent } from './q-parametrizaciones.component';

describe('QParametrizacionesComponent', () => {
  let component: QParametrizacionesComponent;
  let fixture: ComponentFixture<QParametrizacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QParametrizacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QParametrizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
