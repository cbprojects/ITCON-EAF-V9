import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QRolesComponent } from './q-roles.component';

describe('QRolesComponent', () => {
  let component: QRolesComponent;
  let fixture: ComponentFixture<QRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
