import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodTableComponent } from './pod-table.component';

describe('NamespaceTableComponent', () => {
  let component: PodTableComponent;
  let fixture: ComponentFixture<PodTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PodTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PodTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
