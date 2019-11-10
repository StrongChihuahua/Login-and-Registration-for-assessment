import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthOthersComponent } from './auth-others.component';

describe('AuthOthersComponent', () => {
  let component: AuthOthersComponent;
  let fixture: ComponentFixture<AuthOthersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthOthersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
