import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTrushComponent } from './dialog-trush.component';

describe('DialogTrushComponent', () => {
  let component: DialogTrushComponent;
  let fixture: ComponentFixture<DialogTrushComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTrushComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTrushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
