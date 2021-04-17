import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MRolesComponent } from './m-roles.component';

describe('MRolesComponent', () => {
  let component: MRolesComponent;
  let fixture: ComponentFixture<MRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
