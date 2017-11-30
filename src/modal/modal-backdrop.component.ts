import { Component, ElementRef, OnInit, Renderer2, AfterViewInit } from '@angular/core';

import { CLASS_NAME } from './modal-options.class';
import { isBs3 } from '../utils/theme-provider';
import { Utils } from '../utils/utils.class';


/** This component will be added as background layout for modals if enabled */
@Component({
  selector: 'bs-modal-backdrop',
  template: `
    <div class="modal-backdrop">
      &nbsp;
    </div>
  `,
  host: {
    class: 'bs4'
  }
})
export class ModalBackdropComponent implements OnInit {


  get isAnimated(): boolean {
    return this._isAnimated;
  }

  set isAnimated(value: boolean) {
    this._isAnimated = value;
    // this.renderer.setElementClass(this.element.nativeElement, `${ClassName.FADE}`, value);
  }

  get isShown(): boolean {
    return this._isShown;
  }

  set isShown(value: boolean) {
    this._isShown = value;
    if (value) {
      this.renderer.addClass(
        this.backdropDiv,
        `${CLASS_NAME.IN}`
      );
    } else {
      this.renderer.removeClass(
        this.backdropDiv,
        `${CLASS_NAME.IN}`
      );
    }
    if (!isBs3()) {
      if (value) {
        this.renderer.addClass(
          this.backdropDiv,
          `${CLASS_NAME.SHOW}`
        );
      } else {
        this.renderer.removeClass(
          this.backdropDiv,
          `${CLASS_NAME.SHOW}`
        );
      }
    }
  }

  element: ElementRef;
  renderer: Renderer2;
  backdropDiv: HTMLDivElement;

  protected _isAnimated: boolean;
  protected _isShown = false;

  constructor(element: ElementRef, renderer: Renderer2) {
    this.element = element;
    this.renderer = renderer;
  }

  ngOnInit(): void {
    this.backdropDiv = this.element.nativeElement.querySelector('.modal-backdrop');
    if (this.isAnimated) {
      this.renderer.addClass(
        this.backdropDiv,
        `${CLASS_NAME.FADE}`
      );
      Utils.reflow(this.backdropDiv);
    }
    this.isShown = true;
  }
}
