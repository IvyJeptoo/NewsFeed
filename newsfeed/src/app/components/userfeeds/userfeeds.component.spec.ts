import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserfeedsComponent } from './userfeeds.component';

describe('UserfeedsComponent', () => {
  let component: UserfeedsComponent;
  let fixture: ComponentFixture<UserfeedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserfeedsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserfeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
