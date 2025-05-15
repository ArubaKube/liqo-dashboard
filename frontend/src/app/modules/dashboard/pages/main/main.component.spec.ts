import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiqoComponent } from './main.component';

describe('LiqoComponent', () => {
  let component: LiqoComponent;
  let fixture: ComponentFixture<LiqoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LiqoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiqoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
