import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewemployeeFormComponent } from './newemployee-form.component';

describe('NewemployeeFormComponent', () => {
  let component: NewemployeeFormComponent;
  let fixture: ComponentFixture<NewemployeeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewemployeeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewemployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
