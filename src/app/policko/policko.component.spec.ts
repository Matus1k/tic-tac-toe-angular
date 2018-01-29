import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolickoComponent } from './policko.component';

describe('PolickoComponent', () => {
  let component: PolickoComponent;
  let fixture: ComponentFixture<PolickoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolickoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolickoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
