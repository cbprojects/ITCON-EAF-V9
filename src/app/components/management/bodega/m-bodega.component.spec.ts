import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MBodegaComponent } from './m-bodega.component';

describe('MBodegaComponent', () => {
  let component: MBodegaComponent;
  let fixture: ComponentFixture<MBodegaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MBodegaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MBodegaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
