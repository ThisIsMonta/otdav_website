import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArabicComponent } from './edit-arabic.component';

describe('EditArabicComponent', () => {
  let component: EditArabicComponent;
  let fixture: ComponentFixture<EditArabicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditArabicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditArabicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
