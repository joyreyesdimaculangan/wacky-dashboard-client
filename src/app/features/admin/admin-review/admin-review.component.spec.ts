import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReviewComponent } from './admin-review.component';

describe('AdminReviewComponent', () => {
  let component: AdminReviewComponent;
  let fixture: ComponentFixture<AdminReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
