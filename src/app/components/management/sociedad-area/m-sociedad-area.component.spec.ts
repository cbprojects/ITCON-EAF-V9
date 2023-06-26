import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MSociedadAreaComponent } from './m-sociedad-area.component';


describe('MSociedadAreaComponent', () => {
  let component: MSociedadAreaComponent;
  let fixture: ComponentFixture<MSociedadAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MSociedadAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MSociedadAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
