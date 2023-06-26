import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QBodegaComponent } from './q-bodega.component';

describe('QBodegaComponent', () => {
  let component: QBodegaComponent;
  let fixture: ComponentFixture<QBodegaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QBodegaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QBodegaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
