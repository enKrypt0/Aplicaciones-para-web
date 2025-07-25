import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaresFormComponent } from './bares-form.component';

describe('BaresFormComponent', () => {
  let component: BaresFormComponent;
  let fixture: ComponentFixture<BaresFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaresFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaresFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
