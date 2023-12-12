import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateJobPage } from './update-job.page';

describe('UpdateJobPage', () => {
  let component: UpdateJobPage;
  let fixture: ComponentFixture<UpdateJobPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateJobPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
