import { IDisposable } from '../common/lifecycle';
import { IndexPage } from '../page';
import { AboutPage } from '../page/about';
import { ArticlePage } from '../page/article';
import { ProjectPage } from '../page/project';
import { LanguageService } from '../server/languageService';
import { LayoutService } from '../server/layoutService';
import { IViewPath, ViewService } from '../server/viewService';
import { mainViewStyle } from './mainView.style';
import { VIEW_PATHS } from './sidebar';


export class MainView implements IDisposable {
    private element: HTMLElement = document.createElement('div');
    private _viewPath?: IViewPath;

    private _mainView?: IndexPage | ArticlePage | ProjectPage | AboutPage;
    private _layoutService: LayoutService;
    private _languageService: LanguageService;

    constructor(layoutService: LayoutService, languageService: LanguageService, viewService: ViewService) {
        const _style = document.createElement('style');
        _style.appendChild(document.createTextNode(mainViewStyle));
        document.head.appendChild(_style);

        this.element.classList.add('main-view');

        this._viewPath = viewService.currentPath;
        this._layoutService = layoutService;
        this._languageService = languageService;

        this.renderContent();
        viewService.onDidChangeSidebarSelectView((e) => {
            this._viewPath = e;
            document.title = languageService.localize('baseInfo.ownerName', 'coldRoom') + '-' + e.displayName;
            this.renderContent();
        });
    }

    renderContent() {
        this.element.innerHTML = '';
        if (this._mainView) {
            this._mainView.dispose();
        }

        if (this._viewPath === undefined || this._viewPath.id === VIEW_PATHS[0].id) {
            this._mainView = new IndexPage(this._layoutService, this._languageService);
        } else if (this._viewPath.id === VIEW_PATHS[1].id) {
            this._mainView = new ArticlePage(this._layoutService);
        } else if (this._viewPath.id === VIEW_PATHS[2].id) {
            this._mainView = new ProjectPage(this._layoutService);
        } else if (this._viewPath.id === VIEW_PATHS[3].id) {
            this._mainView = new AboutPage(this._layoutService);
        } else {
            this._mainView = new IndexPage(this._layoutService);
        }

        this._mainView.render(this.element);
    }


    render(parent: HTMLElement) {
        parent.appendChild(this.element);
    }


    dispose(): void {
    }


}
