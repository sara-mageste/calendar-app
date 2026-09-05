import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorPickerComponent } from './color-picker.component';
import { ThemeService } from '../../../core/services/theme.service';
import { vi } from 'vitest';

declare const spyOn: any;

describe('ColorPickerComponent', () => {
  let component: ColorPickerComponent;
  let fixture: ComponentFixture<ColorPickerComponent>;
  let themeService: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorPickerComponent],
      providers: [ThemeService]
    }).compileComponents();

    fixture = TestBed.createComponent(ColorPickerComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle popover on togglePopover call', () => {
    expect(component.isOpen()).toBe(false);

    component.togglePopover();
    fixture.detectChanges();
    expect(component.isOpen()).toBe(true);

    component.togglePopover();
    expect(component.isClosing()).toBe(true);
  });

  it('should call themeService.setColor when a color option is selected', () => {
    const setColorSpy = vi.spyOn(themeService, 'setColor');
    const targetColor = themeService.availableColors()[1];

    component.selectColor(targetColor);

    expect(setColorSpy).toHaveBeenCalledWith(targetColor);
  });
});
