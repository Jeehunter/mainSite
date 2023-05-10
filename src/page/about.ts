import { IDisposable } from '../common/lifecycle';
import { AbstractPage } from './abstractPage';



export class AboutPage extends AbstractPage implements IDisposable {


    constructor() {
        super();

        this.element.innerText = 'about';
    }

    dispose(): void {

    }

}

