import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutYouPage } from './about-you.page';

describe('AboutYouPage', () => {
  let component: AboutYouPage;
  let fixture: ComponentFixture<AboutYouPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AboutYouPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
