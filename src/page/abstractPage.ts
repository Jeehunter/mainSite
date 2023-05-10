import { IDisposable } from '../common/lifecycle';



export class AbstractPage implements IDisposable {

    element: HTMLElement;
    protected _style: HTMLStyleElement;

    constructor() {
        this._style = document.createElement('style');
        this.element = document.createElement('div');
        this.element.classList.add('content-container');
    }

    render(parent: HTMLElement) {
        parent.appendChild(this.element);
    }

    dispose(): void {
        document.head.removeChild(this._style);
    }
}