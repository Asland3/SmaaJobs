import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnAuthPage } from './on-auth.page';

describe('OnAuthPage', () => {
  let component: OnAuthPage;
  let fixture: ComponentFixture<OnAuthPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OnAuthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
