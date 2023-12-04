import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNewJobPage } from './add-new-job.page';

describe('AddNewJobPage', () => {
  let component: AddNewJobPage;
  let fixture: ComponentFixture<AddNewJobPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddNewJobPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
