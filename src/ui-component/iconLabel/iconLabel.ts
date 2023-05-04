import { BaseComponent, defineCustomElement } from '../../common/common';
import { IDisposable } from '../../common/lifecycle';
import { iconLabelStyle } from './iconLabel.style';

export enum HoverType {
    Text = 'text',
    Picture = 'picture'
}

export interface IconLabelOptions {
    label: string;
    width?: string;
    iconPath?: string;
    hoverType?: HoverType;
    hover?: string;
    link?: string;
    size?: string;
    iconSize?: string;
}


export class IconLabel extends BaseComponent implements IDisposable {
    private element: HTMLElement;

    private _icon: HTMLElement;
    private _label: HTMLElement;
    private _hover: HTMLElement;

    constructor(options: IconLabelOptions) {
        super();
        const _style = document.createElement('style');
        _style.appendChild(document.createTextNode(iconLabelStyle));
        this.shadow.appendChild(_style);

        this.element = document.createElement('div');
        this.element.classList.add('icon-label');

        if (options.iconPath) {
            this._icon = document.createElement('span');
            this._icon.classList.add('icon');

            if (options.iconSize) {
                this._icon.style.width = options.iconSize;
                this._icon.style.height = options.iconSize;
            }

            const _iconContent = document.createElement('img');
            _iconContent.classList.add('icon-content');
            _iconContent.src = options.iconPath;

            this._icon.appendChild(_iconContent);

            this.element.appendChild(this._icon);
        }

        this._label = document.createElement('span');
        this._label.classList.add('label');
        this._label.innerText = options.label;
        if (options.size) {
            this._label.style.fontSize = options.size;
        }

        this.element.appendChild(this._label);

        if (options.link) {
            const linkable = document.createElement('a');
            linkable.classList.add('linkable');
            linkable.href = options.link;
            linkable.appendChild(this.element);
            this.shadow.appendChild(linkable);
        } else {
            this.shadow.append(this.element);
        }

        this._hover = document.createElement('div');
        this._hover.classList.add('hover');
        this.element.appendChild(this._hover);

        const hoverContent = document.createElement('div');
        hoverContent.classList.add('hover-content');
        this._hover.appendChild(hoverContent);
        if (options.hoverType === HoverType.Text) {
            hoverContent.innerText = options.hover;
        } else if (options.hoverType === HoverType.Picture) {
            hoverContent.style.backgroundImage = `url(${options.hover})`;
        }
    }

    setWidth(width: string) {
        this.element.style.width = width;
    }

    setLabelShow(isShow: boolean) {
        this._label.style.display = isShow ? 'inline-block' : 'none';
    }

    dispose(): void {
        throw new Error('Method not implemented.');
    }

}

defineCustomElement('ui-iconlabel', IconLabel);