import { Renderer2, Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';


/**
 * https://www.htmlgoodies.com/javascript/loading-external-scripts-dynamically-in-angular/
 */
@Injectable({
  providedIn: 'root'
})
export class ScriptService {
 
  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }
 
 /**
  * Append the JS tag to the Document Body.
  * @param renderer The Angular Renderer
  * @param src The path to the script
  * @returns the script element
  */
  public loadJsScript(renderer: Renderer2, src: string, scriptType: string = 'text/javascript'): HTMLScriptElement {
    const script = renderer.createElement('script');
    script.type = scriptType;
    script.src = src;
    renderer.appendChild(this.document.body, script);
    return script;
  }
}
