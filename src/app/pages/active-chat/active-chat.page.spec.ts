import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveChatPage } from './active-chat.page';

describe('ActiveChatPage', () => {
  let component: ActiveChatPage;
  let fixture: ComponentFixture<ActiveChatPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ActiveChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
