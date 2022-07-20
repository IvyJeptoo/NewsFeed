import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllfeedsComponent } from './allfeeds.component';

describe('AllfeedsComponent', () => {
  let component: AllfeedsComponent;
  let fixture: ComponentFixture<AllfeedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllfeedsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllfeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
