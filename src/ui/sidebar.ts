import { IDisposable } from "../common/lifecycle";
import { LayoutService } from "../server/layoutService";
import { sideBarStyle } from "./sidebar.style";
import avatar from '../asset/avatar.png'
import { Image } from "../ui-component/lazyload/image";

export enum layoutWidth {
    Min = 40,
    Middle = 240
}

export const MIN_DEVICE_WIDTH = 720;

export class SideBar implements IDisposable {
    private element: HTMLElement;
    private avatar: Image;


    constructor(layoutService: LayoutService) {
        this.element = document.createElement('div');
        this.element.classList.add('side-bar');

        const width = layoutService.getWindowSize().width <= MIN_DEVICE_WIDTH ? layoutWidth.Min : layoutWidth.Middle;
        this.avatar = new Image(avatar, { width, height: width });
        this.element.style.width = width + 'px';
        this.element.appendChild(this.avatar);



        layoutService.onDidChangeWindowSize((size) => {
            const width = size.width <= MIN_DEVICE_WIDTH ? layoutWidth.Min : layoutWidth.Middle
            this.element.style.width = width + 'px';
            this.avatar.resize({ width, height: width });
        });

        const _style = document.createElement('style');
        _style.appendChild(document.createTextNode(sideBarStyle));
        this.element.appendChild(_style)
    }

    render(parent: HTMLElement) {
        parent.appendChild(this.element);
        
    }

    get width() {
        return this.element.style.width;
    }

    dispose(): void {

    }
}