import { ComponentFixture, TestBed } from '@angular/core/testing';
import { addressPage } from './address.page';

describe('addressPage', () => {
  let component: addressPage;
  let fixture: ComponentFixture<addressPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(addressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
