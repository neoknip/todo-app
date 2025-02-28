import { CommonModule } from '@angular/common';
import { Component, computed, inject, linkedSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { TodoListComponent } from "../todo-list/todo-list.component";
import { ScreenService } from '@app/services/screen.service';
import { DeviceType } from '@app/models/device-type';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ScreenOrientation } from '@app/models/screen-orientation';

@Component({
  selector: 'app-todos',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    RouterOutlet,
    TodoListComponent
  ],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent {

  private _screenService = inject(ScreenService);

  public readonly todoListMode = computed<MatDrawerMode>(() => {
    if (this._screenService.deviceType() === DeviceType.Desktop ||
      (this._screenService.deviceType() === DeviceType.Tablet && this._screenService.screenOrientation() === ScreenOrientation.Landscape)) {
      return 'side'
    }
    else {
      return 'over';
    }
  });
  public readonly showTodoListOpenToggle = computed(() => {
    return !(this._screenService.deviceType() === DeviceType.Desktop ||
      (this._screenService.deviceType() === DeviceType.Tablet && this._screenService.screenOrientation() === ScreenOrientation.Landscape));
  });
  public readonly todoListOpened = linkedSignal(() => {
    return (this._screenService.deviceType() === DeviceType.Desktop ||
    (this._screenService.deviceType() === DeviceType.Tablet && this._screenService.screenOrientation() === ScreenOrientation.Landscape));
  });

  public toggleTodoListOpened(): void {
    this.todoListOpened.update((opened) => !opened);
  }

  public onTodoListOpenedChange(opened: boolean): void {
    this.todoListOpened.set(opened);
  }
}
