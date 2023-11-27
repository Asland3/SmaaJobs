import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NamePicturePage } from './name-picture.page';

describe('NamePicturePage', () => {
  let component: NamePicturePage;
  let fixture: ComponentFixture<NamePicturePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NamePicturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
