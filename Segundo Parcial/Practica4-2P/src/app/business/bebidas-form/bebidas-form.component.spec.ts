import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BebidasFormComponent } from './bebidas-form.component';

describe('BebidasFormComponent', () => {
  let component: BebidasFormComponent;
  let fixture: ComponentFixture<BebidasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BebidasFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BebidasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
