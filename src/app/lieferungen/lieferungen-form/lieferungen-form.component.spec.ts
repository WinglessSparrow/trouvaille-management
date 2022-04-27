import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LieferungenFormComponent } from './lieferungen-form.component';

describe('LieferungenFormComponent', () => {
  let component: LieferungenFormComponent;
  let fixture: ComponentFixture<LieferungenFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LieferungenFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LieferungenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
