import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldersUserComponent } from './folders-user.component';

describe('FoldersUserComponent', () => {
  let component: FoldersUserComponent;
  let fixture: ComponentFixture<FoldersUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoldersUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoldersUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
