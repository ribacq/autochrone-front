import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOverviewCardsComponent } from './project-overview-cards.component';

describe('ProjectOverviewCardsComponent', () => {
  let component: ProjectOverviewCardsComponent;
  let fixture: ComponentFixture<ProjectOverviewCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectOverviewCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectOverviewCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
