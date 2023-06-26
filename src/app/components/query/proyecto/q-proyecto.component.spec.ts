import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QProyectoComponent } from './q-proyecto.component';

describe('QProyectoComponent', () => {
  let component: QProyectoComponent;
  let fixture: ComponentFixture<QProyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QProyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});