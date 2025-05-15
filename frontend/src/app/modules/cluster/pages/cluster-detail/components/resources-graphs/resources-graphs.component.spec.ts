import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesGraphsComponent } from './resources-graphs.component';

describe('ResourcesGraphsComponent', () => {
  let component: ResourcesGraphsComponent;
  let fixture: ComponentFixture<ResourcesGraphsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResourcesGraphsComponent]
    });
    fixture = TestBed.createComponent(ResourcesGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
