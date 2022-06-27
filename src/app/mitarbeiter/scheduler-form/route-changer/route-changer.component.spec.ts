import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteChangerComponent } from './route-changer.component';

describe('RouteChangerComponent', () => {
  let component: RouteChangerComponent;
  let fixture: ComponentFixture<RouteChangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteChangerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteChangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
