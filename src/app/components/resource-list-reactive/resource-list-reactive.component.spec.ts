import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceListReactiveComponent } from './resource-list-reactive.component';

describe('ResourceListReactiveComponent', () => {
  let component: ResourceListReactiveComponent;
  let fixture: ComponentFixture<ResourceListReactiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceListReactiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceListReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
