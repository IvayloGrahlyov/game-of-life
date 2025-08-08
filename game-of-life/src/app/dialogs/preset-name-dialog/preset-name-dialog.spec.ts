import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresetNameDialog } from './preset-name-dialog';

describe('PresetNameDialog', () => {
  let component: PresetNameDialog;
  let fixture: ComponentFixture<PresetNameDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresetNameDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresetNameDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
