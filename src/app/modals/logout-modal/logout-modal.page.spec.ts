import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoutModalPage } from './logout-modal.page';

describe('LogoutModalPage', () => {
  let component: LogoutModalPage;
  let fixture: ComponentFixture<LogoutModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LogoutModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
