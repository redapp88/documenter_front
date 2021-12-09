import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSidebar2Component } from './left-sidebar2.component';

describe('LeftSidebar2Component', () => {
  let component: LeftSidebar2Component;
  let fixture: ComponentFixture<LeftSidebar2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftSidebar2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftSidebar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
