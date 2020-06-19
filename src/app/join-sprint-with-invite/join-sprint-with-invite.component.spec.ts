import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinSprintWithInviteComponent } from './join-sprint-with-invite.component';

describe('JoinSprintWithInviteComponent', () => {
  let component: JoinSprintWithInviteComponent;
  let fixture: ComponentFixture<JoinSprintWithInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinSprintWithInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinSprintWithInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
