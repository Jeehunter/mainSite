import { IDisposable } from '../common/lifecycle';
import { AbstractPage } from './abstractPage';
import background from '../asset/images/background.jpg';
import { indexStyle } from './index.style';
import { ISize, LayoutService, MIN_DEVICE_WIDTH } from '../server/layoutService';
import { LanguageService } from '../server/languageService';
import { ViewService } from '../server/viewService';


enum layoutWidth {
    Min = '300px',
    Middle = '480px'
}

enum layoutHeight {
    Min = '250px',
    Middle = '380px'
}

interface accessItemHandler {
    handler: () => unknown;
}

export class IndexPage extends AbstractPage implements IDisposable {

    private _welcomeWrapper: HTMLElement;


    constructor(layoutService?: LayoutService, languageService?: LanguageService, viewService?: ViewService) {
        super(layoutService, languageService, viewService);


        this._style.appendChild(document.createTextNode(indexStyle));
        document.head.appendChild(this._style);

        this.element.classList.add('index');

        this.element.style.backgroundImage = `url(${background})`;

        this._welcomeWrapper = document.createElement('div');
        this._welcomeWrapper.classList.add('welcome-wrapper');

        this.renderWelcomeWrapper();

    }

    renderWelcomeWrapper() {
        this.element.appendChild(this._welcomeWrapper);
        this._resize(this._layoutService.getWindowSize());
        this._layoutService.onDidChangeWindowSize((size) => {
            this._resize(size);
        });

        const welcomeTitle = document.createElement('h2');
        welcomeTitle.classList.add('welcome-title');
        welcomeTitle.innerText = this._languageService.localize('index.welcome.title', 'Welcome');
        this._welcomeWrapper.appendChild(welcomeTitle);


    }

    createAccessItem(title: string, desc: string, handler: accessItemHandler) {
        const item = document.createElement('div');
        item.classList.add('access-item');

        const titleDom = document.createElement('h4');
        titleDom.innerText = title;
        item.appendChild(titleDom);

        const descDom = document.createElement('p');
        descDom.innerText = desc;
        item.appendChild(descDom);

        item.addEventListener('click', () => {
            handler.handler();
        });

        return item;
    }

    private _resize(size: ISize) {
        const width = size.width <= MIN_DEVICE_WIDTH ? layoutWidth.Min : layoutWidth.Middle;
        this._welcomeWrapper.style.width = width;
        this._welcomeWrapper.style.height = width === layoutWidth.Min ? layoutHeight.Min : layoutHeight.Middle;
    }


}