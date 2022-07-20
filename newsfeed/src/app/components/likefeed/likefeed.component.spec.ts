import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikefeedComponent } from './likefeed.component';

describe('LikefeedComponent', () => {
  let component: LikefeedComponent;
  let fixture: ComponentFixture<LikefeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikefeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikefeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
