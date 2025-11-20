import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatHospital } from './creat-hospital';

describe('CreatHospital', () => {
  let component: CreatHospital;
  let fixture: ComponentFixture<CreatHospital>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatHospital]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatHospital);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
