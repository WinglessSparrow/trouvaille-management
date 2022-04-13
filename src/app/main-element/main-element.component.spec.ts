import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainElementComponent } from './main-element.component';

describe('MainElementComponent', () => {
  let component: MainElementComponent;
  let fixture: ComponentFixture<MainElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
