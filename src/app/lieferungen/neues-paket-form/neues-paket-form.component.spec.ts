import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeuesPaketFormComponent } from './neues-paket-form.component';

describe('NeuesPaketFormComponent', () => {
  let component: NeuesPaketFormComponent;
  let fixture: ComponentFixture<NeuesPaketFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeuesPaketFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeuesPaketFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
