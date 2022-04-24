import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LieferungenComponent } from './lieferungen.component';

describe('LieferungenComponent', () => {
  let component: LieferungenComponent;
  let fixture: ComponentFixture<LieferungenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LieferungenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LieferungenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
