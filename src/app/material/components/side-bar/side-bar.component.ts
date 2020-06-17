import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from "@angular/cdk/layout";
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit,OnDestroy {

  moBileQueryMax:MediaQueryList;

  private _mobileQueryListener : () => void;

  constructor(
    private changeDetectorRef : ChangeDetectorRef,
    private media : MediaMatcher,
  ) {
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.moBileQueryMax = media.matchMedia('(max-width:600px)')
    this.moBileQueryMax.addListener(this._mobileQueryListener)
   }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.moBileQueryMax.removeListener(this._mobileQueryListener);
  }

}
