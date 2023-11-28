import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltermodalPage } from './filtermodal.page';

describe('FiltermodalPage', () => {
  let component: FiltermodalPage;
  let fixture: ComponentFixture<FiltermodalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FiltermodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
