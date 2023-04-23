import { IDisposable } from '../common/lifecycle';
import { ISize, LayoutService } from '../server/layoutService';
import { sideBarStyle } from './sidebar.style';
import avatar from '../asset/avatar.png';
import { Image } from '../ui-component/lazyload/image';
import { LanguageService } from '../server/languageService';
import { ViewSelector } from '../ui-component/viewSelector/viewSelector';
import { ViewService } from '../server/viewService';

export enum layoutWidth {
    Min = 40,
    Middle = 240
}

export const MIN_DEVICE_WIDTH = 720;

export class SideBar implements IDisposable {
    private element: HTMLElement;
    private avatar: Image;
    private ownerName: HTMLElement;
    private selector: ViewSelector;

    private _size: ISize;


    _languageService: LanguageService;

    constructor(layoutService: LayoutService, languageService: LanguageService, viewService: ViewService) {
        const _style = document.createElement('style');
        _style.appendChild(document.createTextNode(sideBarStyle));
        document.head.appendChild(_style);

        this._languageService = languageService;

        this.element = document.createElement('div');
        this.element.classList.add('side-bar');

        this._size = { width: layoutService.getWindowSize().width <= MIN_DEVICE_WIDTH ? layoutWidth.Min : layoutWidth.Middle };
        this.element.style.width = this._size.width + 'px';

        this.avatar = new Image(avatar, { width: this._size.width, height: this._size.width });
        this.element.appendChild(this.avatar);

        this.renderOwnername();

        this.selector = new ViewSelector([], { width: this._size.width });

        layoutService.onDidChangeWindowSize((size) => {
            const width = size.width <= MIN_DEVICE_WIDTH ? layoutWidth.Min : layoutWidth.Middle;
            this.element.style.width = width + 'px';
            this.avatar.resize({ width, height: width });
        });
    }

    render(parent: HTMLElement) {
        parent.appendChild(this.element);

    }

    renderOwnername() {
        this.ownerName = document.createElement('div');
        this.ownerName.classList.add('owner-name');
        this.ownerName.innerText = this._languageService.localize('baseInfo.ownerName', 'Jeehunter');
        this.element.appendChild(this.ownerName);
    }


    get width() {
        return this.element.style.width;
    }

    dispose(): void {
        this.element.remove();
    }
}