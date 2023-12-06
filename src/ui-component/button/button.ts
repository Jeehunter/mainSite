import { BaseComponent, defineCustomElement } from '../../common/common';
import { IDisposable } from '../../common/lifecycle';
import { uiButtonStyle } from './button.style';


enum buttonSize {
    small = 'small',
    middle = 'middle',
    large = 'large'
}

export interface UIButtonOptions {
    label: string;
    size?: buttonSize
}


export class UIButton extends BaseComponent implements IDisposable {
    element: HTMLElement;
    private options: UIButtonOptions;

    constructor(buttonOptions: UIButtonOptions) {
        super();
        this.options = buttonOptions;

        this.element = document.createElement('button');
        this.element.classList.add('ui-button');

        const _style = document.createElement('style');
        _style.appendChild(document.createTextNode(uiButtonStyle));
        this.shadow.appendChild(_style);

        if (!buttonOptions.size) {
            this.options.size = buttonSize.middle;
        }
        this.renderSize(this.options.size);




        this.element.innerText = buttonOptions.label;
        this.shadow.append(this.element);
    }

    renderSize(size: buttonSize) {
        this.element.classList.add(size);
    }

    dispose(): void {
        throw new Error('Method not implemented.');
    }

}

defineCustomElement('ui-button', UIButton);