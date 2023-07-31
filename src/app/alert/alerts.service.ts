import { ElementRef, Injectable, Renderer2 ,RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2
    ) {this.renderer = rendererFactory.createRenderer(null, null); }


  displayAlertMessage(message: string | null = null,type:string,alert:ElementRef) {

    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type 
    + ' alert-dismissible" role="alert">' + message + 
    '<button type="button" class="btn-close" aria-label="Close" data-bs-dismiss="alert"></button></div>'
  
    this.renderer.appendChild(alert.nativeElement,wrapper);
  }

}
