import { IDisposable } from '../common/lifecycle';
import { ISize, LayoutService, MIN_DEVICE_WIDTH } from '../server/layoutService';
import { sideBarStyle } from './sidebar.style';
import avatar from '../asset/avatar.png';
import { Image } from '../ui-component/lazyload/image';
import { LanguageService } from '../server/languageService';
import { ViewSelector } from '../ui-component/viewSelector/viewSelector';
import { IViewPath, ViewService } from '../server/viewService';

import githubIcon from '../asset/logo/github.png';
import bilibiliIcon from '../asset/logo/bilibili.png';
import wechatIcon from '../asset/logo/wechat.png';
import wechatQR from '../asset/images/wechatQR.png';
import { HoverType, IconLabel, IconLabelOptions } from '../ui-component/iconLabel/iconLabel';
import { ProductService } from '../server/productService';

export enum layoutWidth {
    Min = 40,
    Middle = 240
}

export const VIEW_PATHS: IViewIdPath[] = [
    { id: 'view.id.index', path: '#/' },
    { id: 'view.id.article', path: '#/article' },
    { id: 'view.id.project', path: '#/project' },
    { id: 'view.id.about', path: '#/about' }
];



export type IViewIdPath = Omit<IViewPath, 'displayName'>

export class SideBar implements IDisposable {
    private element: HTMLElement;
    private avatar: Image;
    private ownerName: HTMLElement;
    private selector: ViewSelector;
    private copyRight: HTMLElement;
    private productService: ProductService = ProductService.getInstance();

    private _size: ISize;

    private _copyrightEndYear = '2023';

    private _ownerInfo: IconLabelOptions[] = [
        {
            iconPath: githubIcon,
            label: this.productService.getProductBy('ownerInfo.github.label'),
            link: this.productService.getProductBy('ownerInfo.github.link'),
            size: '13px',
            iconSize: '22px'
        },
        {
            iconPath: bilibiliIcon,
            label: this.productService.getProductBy('ownerInfo.bilibili.label'),
            link: this.productService.getProductBy('ownerInfo.bilibili.link'),
            size: '13px',
            iconSize: '22px'
        },
        {
            iconPath: wechatIcon,
            label: 'JeeHunterN[QR-code]',
            hover: wechatQR,
            hoverType: HoverType.Picture,
            size: '13px',
            iconSize: '22px'
        }
    ];


    private _ownerInfoItems: IconLabel[] = [];

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

        const viewPaths = [];

        for (const viewIdPath of VIEW_PATHS) {
            const item = { ...viewIdPath, displayName: this._languageService.localize(viewIdPath.id, viewIdPath.id) };
            viewPaths.push(item);
        }
        this.selector = new ViewSelector(viewPaths, { width: this._size.width });
        this.element.appendChild(this.selector);

        this.selector.onDidSelectView((path) => {
            viewService.setSidebarSelectView(path);
        });

        for (const ownInfo of this._ownerInfo) {
            const ownerInfoContainer = document.createElement('div');
            ownerInfoContainer.classList.add('owner-info-container');
            const item = new IconLabel(ownInfo);
            this._ownerInfoItems.push(item);
            item.style.marginBottom = '40px';
            ownerInfoContainer.append(item);
            this.element.appendChild(ownerInfoContainer);
        }

        layoutService.onDidChangeWindowSize((size) => {
            this._resize(size);
        });

        this.renderCopyRight();

        this._resize({ width: layoutService.getWindowSize().width });
    }

    render(parent: HTMLElement) {
        parent.appendChild(this.element);
    }

    private _resize(size: ISize) {
        const width = size.width <= MIN_DEVICE_WIDTH ? layoutWidth.Min : layoutWidth.Middle;
        this.element.style.width = width + 'px';
        this.avatar.resize({ width, height: width });

        this._ownerInfoItems.forEach(item => {
            item.setLabelShow(width === layoutWidth.Middle ? true : false);
        });

        this.copyRight.style.display = (width === layoutWidth.Middle ? 'block' : 'none');
    }

    renderOwnername() {
        this.ownerName = document.createElement('div');
        this.ownerName.classList.add('owner-name');
        this.ownerName.innerText = this._languageService.localize('baseInfo.ownerName', 'Jeehunter');
        this.element.appendChild(this.ownerName);
    }

    renderCopyRight() {
        this.copyRight = document.createElement('div');
        this.copyRight.classList.add('copyright-container');
        const content = document.createElement('p');
        content.classList.add('copyright-container-content');
        content.innerHTML = `Copyright © 2019-${this._copyrightEndYear} All Rights Reserved.
        <br/><a class='copyright-container-content-linkable' target="blank" href="https://beian.miit.gov.cn/">黑ICP备18004551号-2 </a>`;
        this.copyRight.appendChild(content);
        this.element.appendChild(this.copyRight);
    }

    get width() {
        return this.element.style.width;
    }

    dispose(): void {
        this.element.remove();
    }
}