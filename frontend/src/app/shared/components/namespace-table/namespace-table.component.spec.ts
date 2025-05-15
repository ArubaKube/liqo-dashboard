import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NamespaceTableComponent } from './namespace-table.component';

describe('NamespaceTableComponent', () => {
  let component: NamespaceTableComponent;
  let fixture: ComponentFixture<NamespaceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NamespaceTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NamespaceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
