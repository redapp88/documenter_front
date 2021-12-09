import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocVerifyPublicComponent } from './doc-verify-public.component';

describe('DocVerifyPublicComponent', () => {
  let component: DocVerifyPublicComponent;
  let fixture: ComponentFixture<DocVerifyPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocVerifyPublicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocVerifyPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
