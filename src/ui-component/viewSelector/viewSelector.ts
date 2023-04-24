import { BaseComponent, defineCustomElement } from '../../common/common';
import { IDisposable } from '../../common/lifecycle';
import { ISize } from '../../server/layoutService';
import { IViewPath } from '../../server/viewService';

export class ViewSelector extends BaseComponent implements IDisposable {
    element: HTMLElement;

    constructor(viewPaths: IViewPath[], size: ISize) {
        super();
        this.element = document.createElement('ul');
        this.shadow.appendChild(this.element);
    }

    setSize(size: ISize) {
        this.element.style.width = size.width + 'px';
    }

    dispose(): void {
        throw new Error('Method not implemented.');
    }

}

defineCustomElement('ui-view-selector', ViewSelector);