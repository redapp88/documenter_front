import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppGuideComponent } from './app-guide.component';

describe('AppGuideComponent', () => {
  let component: AppGuideComponent;
  let fixture: ComponentFixture<AppGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
