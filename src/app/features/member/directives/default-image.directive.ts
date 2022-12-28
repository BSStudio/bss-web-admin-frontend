import { Directive, ElementRef, HostListener } from '@angular/core'

@Directive({
  selector: '[appDefaultImage]',
})
export class DefaultImageDirective {
  constructor(private el: ElementRef<HTMLImageElement>) {}

  @HostListener('error')
  public onError(event: ErrorEvent) {
    if (this.el.nativeElement.parentElement) {
      const source = this.el.nativeElement.parentElement.children.item(0) as HTMLSourceElement
      source.srcset = this.el.nativeElement.src
    }
  }
}
