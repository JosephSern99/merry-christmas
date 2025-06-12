import { Injectable, ApplicationRef, ComponentFactoryResolver, Injector, EmbeddedViewRef } from '@angular/core';
import { Observer } from 'rxjs';

import { BlockUiModalComponent } from './block-ui-modal.component';
import { SharedModule } from '../../shared.module';

@Injectable({
  providedIn: SharedModule,
})
export class BlockUiService {
  private component!: BlockUiModalComponent;
  private showStack = 0;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector) {

    this.init();
  }

  open(progress?: Observer<any>): void {
    this.component.block = true;

    // delay by 500ms to decrease chance of flashing
    setTimeout(() => {
      this.showStack++;
      if (this.showStack > 0)
        this.component.show = true;
    }, 500);
  }

  close(): void {
    this.component.block = false;

    this.showStack--;
    if (this.showStack <= 0)
      this.component.show = false;
  }

  private init(): void {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(BlockUiModalComponent)
      .create(this.injector);

    this.component = componentRef.instance;

    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(componentRef.hostView);

    // 3. Get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // 4. Append DOM element to the body
    document.body.appendChild(domElem);
  }
}
