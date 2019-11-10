import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAuthNavbarComponent } from './home-auth-navbar.component';

describe('HomeAuthNavbarComponent', () => {
  let component: HomeAuthNavbarComponent;
  let fixture: ComponentFixture<HomeAuthNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAuthNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAuthNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
