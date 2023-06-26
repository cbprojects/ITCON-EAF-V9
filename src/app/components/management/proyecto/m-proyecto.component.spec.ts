import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MProyectoComponent } from './m-proyecto.component';

describe('MProyectoComponent', () => {
  let component: MProyectoComponent;
  let fixture: ComponentFixture<MProyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MProyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
