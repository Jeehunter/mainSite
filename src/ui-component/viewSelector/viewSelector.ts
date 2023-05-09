import { BaseComponent, defineCustomElement } from '../../common/common';
import { EventEmitter } from '../../common/event';
import { IDisposable } from '../../common/lifecycle';
import { ISize } from '../../server/layoutService';
import { IViewPath } from '../../server/viewService';
import { viewSelectorStyle } from './viewSelector.style';

export class ViewSelector extends BaseComponent implements IDisposable {
    element: HTMLElement;
    viewItems: HTMLElement[] = [];
    viewPaths: IViewPath[] = [];

    private _onDidSelectView = new EventEmitter<IViewPath>();
    public onDidSelectView = this._onDidSelectView.asSubscriber('onDidSelectView');

    constructor(viewPaths: IViewPath[], size: ISize) {
        super();
        const _style = document.createElement('style');
        _style.appendChild(document.createTextNode(viewSelectorStyle));
        this.shadow.appendChild(_style);

        this.element = document.createElement('ul');
        this.element.classList.add('view-selector');
        this.shadow.appendChild(this.element);
        for (const viewPath of viewPaths) {
            const viewItem = this.createViewItem(viewPath);
            this.viewItems.push(viewItem);
            this.viewPaths.push(viewPath);
            this.element.appendChild(viewItem);
        }
        if (this.viewPaths.length) {
            this.selectView(this.viewPaths[0].id);
        }

        this.selectView(viewPaths[0].id);

        for (let i = 0; i < this.viewItems.length; i++) {
            const viewItem = this.viewItems[i];
            viewItem.onclick = ()=>{
                this.selectView(viewItem.id);
            };
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
        this.viewItems.forEach((item) => {
            if (item.id === id) {
                item.setAttribute('isactive', 'isactive');
            } else {
                item.removeAttribute('isactive');
            }
        });
        this.viewPaths.forEach((item) => {
            if (item.id === id) {
                this._onDidSelectView.emit('onDidSelectView', item);
            }
        });
    }

    dispose(): void {
        throw new Error('Method not implemented.');
    }

}

defineCustomElement('ui-view-selector', ViewSelector);