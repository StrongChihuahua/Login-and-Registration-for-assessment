import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAuthPostComponent } from './home-auth-post.component';

describe('HomeAuthPostComponent', () => {
  let component: HomeAuthPostComponent;
  let fixture: ComponentFixture<HomeAuthPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAuthPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAuthPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
