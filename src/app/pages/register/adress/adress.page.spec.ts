import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdressPage } from './adress.page';

describe('AdressPage', () => {
  let component: AdressPage;
  let fixture: ComponentFixture<AdressPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
