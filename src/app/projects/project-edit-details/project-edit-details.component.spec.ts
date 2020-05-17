import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEditDetailsComponent } from './project-edit-details.component';

describe('ProjectEditDetailsComponent', () => {
  let component: ProjectEditDetailsComponent;
  let fixture: ComponentFixture<ProjectEditDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectEditDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
