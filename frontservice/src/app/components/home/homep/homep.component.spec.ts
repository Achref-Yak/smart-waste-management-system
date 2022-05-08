import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepComponent } from './homep.component';

describe('HomepComponent', () => {
  let component: HomepComponent;
  let fixture: ComponentFixture<HomepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
