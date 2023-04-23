import { IDisposable } from '../common/lifecycle';
import { LayoutService } from '../server/layoutService';
import { sideBarStyle } from './sidebar.style';
import avatar from '../asset/avatar.png';
import { Image } from '../ui-component/lazyload/image';
import { LanguageService } from '../server/languageService';

export enum layoutWidth {
    Min = 40,
    Middle = 240
}

export const MIN_DEVICE_WIDTH = 720;

export class SideBar implements IDisposable {
    private element: HTMLElement;
    private avatar: Image;
    private ownerName: HTMLElement;

    constructor(layoutService: LayoutService, languageService: LanguageService) {
        const _style = document.createElement('style');
        _style.appendChild(document.createTextNode(sideBarStyle));
        document.head.appendChild(_style);

        this.element = document.createElement('div');
        this.element.classList.add('side-bar');

        const width = layoutService.getWindowSize().width <= MIN_DEVICE_WIDTH ? layoutWidth.Min : layoutWidth.Middle;
        this.avatar = new Image(avatar, { width, height: width });
        this.element.style.width = width + 'px';
        this.element.appendChild(this.avatar);

        this.ownerName = document.createElement('div');
        this.ownerName.classList.add('owner-name');
        this.ownerName.innerText = languageService.localize('baseInfo.ownerName', 'Jeehunter');


        layoutService.onDidChangeWindowSize((size) => {
            const width = size.width <= MIN_DEVICE_WIDTH ? layoutWidth.Min : layoutWidth.Middle;
            this.element.style.width = width + 'px';
            this.avatar.resize({ width, height: width });
        });
    }

    render(parent: HTMLElement) {
        parent.appendChild(this.element);
        this.element.appendChild(this.ownerName);

    }



    get width() {
        return this.element.style.width;
    }

    dispose(): void {
        this.element.remove();
    }
}