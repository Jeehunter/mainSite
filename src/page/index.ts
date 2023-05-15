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
    }

    private _resize(size: ISize) {
        const width = size.width <= MIN_DEVICE_WIDTH ? layoutWidth.Min : layoutWidth.Middle;
        this._welcomeWrapper.style.width = width;
        this._welcomeWrapper.style.height = width === layoutWidth.Min ? layoutHeight.Min : layoutHeight.Middle;
    }


}