import { IDisposable } from '../common/lifecycle';
import { AbstractPage } from './abstractPage';
import background from '../asset/images/background.jpg';
import { indexStyle } from './index.style';


export class IndexPage extends AbstractPage implements IDisposable {

    constructor() {
        super();

        this._style.appendChild(document.createTextNode(indexStyle));
        document.head.appendChild(this._style);

        this.element.classList.add('index');

        this.element.innerText = 'index';
        this.element.style.backgroundImage = `url(${background})`;

    }


}