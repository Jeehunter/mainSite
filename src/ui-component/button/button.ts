import { BaseComponent, defineCustomElement } from '../../common/common';
import { IDisposable } from '../../common/lifecycle';

export interface UIButtonOptions {
    label: string;
}


export class UIButton extends BaseComponent implements IDisposable {
    element: HTMLElement;


    constructor(buttonOptions: UIButtonOptions) {
        super();
        this.element = document.createElement('button');

        this.element.innerText = buttonOptions.label;
        this.shadow.append(this.element);
    }

    dispose(): void {
        throw new Error('Method not implemented.');
    }

}

defineCustomElement('ui-button', UIButton);