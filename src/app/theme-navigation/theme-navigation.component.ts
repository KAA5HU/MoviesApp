import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-theme-navigation',
  templateUrl: './theme-navigation.component.html',
  styleUrls: ['./theme-navigation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeNavigationComponent {
  @Input() isDarkMode = false;

  @Output()
  readonly darkModeSwitched = new EventEmitter<boolean>();

  onDarkModeSwitched({ checked }: MatSlideToggleChange) {
    this.darkModeSwitched.emit(checked);
  }
}
