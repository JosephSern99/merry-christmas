import { Injectable, Output, EventEmitter, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef } from '@angular/core';
import { Observer } from 'rxjs';

import { LoaderComponent } from './loader.component';
import { SharedModule } from '../../shared.module';

@Injectable({
    providedIn: SharedModule
})
export class LoaderService {
    private component!: LoaderComponent;
    private displayLoader = false;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector) {

        this.init();
    }

    @Output() change: EventEmitter<boolean> = new EventEmitter();

    public open(progress?: Observer<any>): void {
        this.component.displayLoader = true;
    }

    public close(): void {
        this.component.displayLoader = false;
    }

    private init(): void {
        const componentRef = this.componentFactoryResolver
            .resolveComponentFactory(LoaderComponent)
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

    hideLoader(): void {
        this.displayLoader = true;
        this.change.emit(this.displayLoader);
    }
}
