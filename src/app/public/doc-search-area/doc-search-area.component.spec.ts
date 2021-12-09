import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocSearchAreaComponent } from './doc-search-area.component';

describe('DocSearchAreaComponent', () => {
  let component: DocSearchAreaComponent;
  let fixture: ComponentFixture<DocSearchAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocSearchAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocSearchAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
