import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultaLazyComponent } from './consultaLazy.component';


describe('ConsultaLazyComponent', () => {
  let component: ConsultaLazyComponent;
  let fixture: ComponentFixture<ConsultaLazyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultaLazyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaLazyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});