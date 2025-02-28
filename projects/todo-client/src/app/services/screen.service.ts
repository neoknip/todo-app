import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DeviceType } from '@app/models/device-type';
import { ScreenOrientation } from '@app/models/screen-orientation';

const deviceTypeForBreakpoints = new Map([
  [Breakpoints.HandsetPortrait, DeviceType.Mobile],
  [Breakpoints.HandsetLandscape, DeviceType.Mobile],
  [Breakpoints.TabletPortrait, DeviceType.Tablet],
  [Breakpoints.TabletLandscape, DeviceType.Tablet],
  [Breakpoints.WebPortrait, DeviceType.Desktop],
  [Breakpoints.WebLandscape, DeviceType.Desktop],
]);

const screenOrientationForBreakpoints = new Map([
  ['(orientation: portrait)', ScreenOrientation.Portrait],
  ['(orientation: landscape)', ScreenOrientation.Landscape],
])

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  private _breakpointObserver = inject(BreakpointObserver);
  private readonly _deviceType = signal(DeviceType.Mobile);
  public get deviceType(): Signal<DeviceType> {
    return this._deviceType.asReadonly();
  }
  private readonly _screenOrientation = signal(ScreenOrientation.Portrait);
  public get screenOrientation(): Signal<ScreenOrientation> {
    return this._screenOrientation.asReadonly();
  }

  constructor() {
    this._breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.Web,
      '(orientation: portrait)',
      '(orientation: landscape)',
    ]).pipe(takeUntilDestroyed()).subscribe(result => {
      if (result.matches) {
        for (let [breakpoint, deviceType] of deviceTypeForBreakpoints.entries()) {
          if (result.breakpoints[breakpoint]) {
            this._deviceType.set(deviceType);
            break;
          }
        }
        for (let [breakpoint, screenOrientation] of screenOrientationForBreakpoints.entries()) {
          if (result.breakpoints[breakpoint]) {
            this._screenOrientation.set(screenOrientation);
          }
        }
      }
    })
  }
}
