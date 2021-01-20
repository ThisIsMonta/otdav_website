import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFrenchComponent } from './edit-french.component';

describe('EditFrenchComponent', () => {
  let component: EditFrenchComponent;
  let fixture: ComponentFixture<EditFrenchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFrenchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFrenchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
