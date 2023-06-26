import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MPerfilesComponent } from './m-perfiles.component';

describe('MPerfilesComponent', () => {
  let component: MPerfilesComponent;
  let fixture: ComponentFixture<MPerfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MPerfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MPerfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
