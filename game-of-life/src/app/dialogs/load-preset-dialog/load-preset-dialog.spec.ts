import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadPresetDialog } from './load-preset-dialog';

describe('LoadPresetDialog', () => {
  let component: LoadPresetDialog;
  let fixture: ComponentFixture<LoadPresetDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadPresetDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadPresetDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
