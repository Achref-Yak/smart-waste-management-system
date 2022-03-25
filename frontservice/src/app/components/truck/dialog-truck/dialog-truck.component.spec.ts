import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTruckComponent } from './dialog-truck.component';

describe('DialogTruckComponent', () => {
  let component: DialogTruckComponent;
  let fixture: ComponentFixture<DialogTruckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTruckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
