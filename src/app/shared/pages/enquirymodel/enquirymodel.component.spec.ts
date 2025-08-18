import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquirymodelComponent } from './enquirymodel.component';

describe('EnquirymodelComponent', () => {
  let component: EnquirymodelComponent;
  let fixture: ComponentFixture<EnquirymodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnquirymodelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquirymodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
