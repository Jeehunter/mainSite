import { IDisposable } from '../common/lifecycle';
import { LanguageService } from '../server/languageService';
import { LayoutService } from '../server/layoutService';
import { ViewService } from '../server/viewService';



export class AbstractPage implements IDisposable {

    element: HTMLElement;
    protected _style: HTMLStyleElement;

    protected _layoutService?: LayoutService;
    protected _languageService?: LanguageService;
    protected _viewService?: ViewService;

    constructor(layoutService?: LayoutService, languageService?: LanguageService, viewService?: ViewService) {
        this._layoutService = layoutService;
        this._languageService = languageService;
        this._viewService = viewService;

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