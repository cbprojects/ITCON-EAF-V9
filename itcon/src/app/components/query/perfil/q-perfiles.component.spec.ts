import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QPerfilesComponent } from './q-perfiles.component';

describe('QPerfilesComponent', () => {
  let component: QPerfilesComponent;
  let fixture: ComponentFixture<QPerfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QPerfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QPerfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
