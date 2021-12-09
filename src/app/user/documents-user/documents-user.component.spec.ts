import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsUserComponent } from './documents-user.component';

describe('DocumentsUserComponent', () => {
  let component: DocumentsUserComponent;
  let fixture: ComponentFixture<DocumentsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentsUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
