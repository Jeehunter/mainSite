import { BaseComponent, defineCustomElement } from '../../common/common';
import { IDisposable } from '../../common/lifecycle';
import { ISize } from '../../server/layoutService';
import { IViewPath } from '../../server/viewService';

export class ViewSelector extends BaseComponent implements IDisposable {
    element: HTMLElement;
    viewItems: HTMLElement[] = [];
    viewPaths: IViewPath[] = [];

    constructor(viewPaths: IViewPath[], size: ISize) {
        super();
        this.element = document.createElement('ul');
        this.element.classList.add('view-selector');
        this.shadow.appendChild(this.element);
        for (const viewPath of viewPaths) {
            const viewItem = this.createViewItem(viewPath);
            this.viewItems.push(viewItem);
            this.viewPaths.push(viewPath);
            this.element.appendChild(viewItem);
        }
        if(this.viewPaths.length){
            this.selectView(this.viewPaths[0].id);
        }
    }

    private createViewItem(viewPath: IViewPath) {
        const item = document.createElement('li');
        item.classList.add('view-item-container');
        item.id = viewPath.id;
        const itemLabel = document.createElement('a');
        itemLabel.href = viewPath.path;
        itemLabel.innerText = viewPath.displayName;
        itemLabel.classList.add('view-item-label');
        item.appendChild(itemLabel);
        return item;
    }

    setSize(size: ISize) {
        this.element.style.width = size.width + 'px';
    }

    selectView(id: string) {

    }

    dispose(): void {
        throw new Error('Method not implemented.');
    }

}

defineCustomElement('ui-view-selector', ViewSelector);