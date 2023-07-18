import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[changeBGcolor]'
})
export class ChangeBgColorDirective {

  @Input('changeBGcolor') changeClass!: string;
  @Input('lastModified') lastModified !: string;

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef
  ) { }

  ngAfterViewInit() {
    this.setAndRemoveClass(this.changeClass);
  }

  setAndRemoveClass(className: string) {
    this.renderer.removeClass(this.elementRef.nativeElement, className);

    let diff: number = Math.abs(new Date().valueOf()
      - new Date(this.lastModified).valueOf());
    let finalMinutes: number = Math.floor((diff / 1000) / 60);

    const minimumTime: number = 3;

    let totalCalculatedTime = (minimumTime - finalMinutes) < 0 ? 0 : minimumTime;

    setTimeout(() => {
      this.renderer.addClass(this.elementRef.nativeElement, className);
    }, totalCalculatedTime * 60 * 100);
  }

}
