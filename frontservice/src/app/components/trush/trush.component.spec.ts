import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrushComponent } from './trush.component';

describe('TrushComponent', () => {
  let component: TrushComponent;
  let fixture: ComponentFixture<TrushComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrushComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
