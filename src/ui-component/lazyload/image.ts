import { BaseComponent, defineCustomElement } from '../../common/common';
import { IDisposable } from '../../common/lifecycle';
import { ISize } from '../../server/layoutService';

export class Image extends BaseComponent implements IDisposable {
    public element: HTMLImageElement;

    constructor(src: string, size: ISize) {
        super();
        this.element = document.createElement('img');
        this.element.src = src;
        this.resize(size);
        this.shadow.appendChild(this.element);
    }

    resize(size:ISize){
        if (size.height) {
            this.element.style.height = size.height + 'px';
        }
        if (size.width) {
            this.element.style.width = size.width + 'px';
        }
    }

    render() {
    }

    dispose(): void {
        throw new Error('Method not implemented.');
    }

}

defineCustomElement('ui-image', Image);