import { IDisposable } from '../common/lifecycle';
import { AbstractPage } from './abstractPage';





export class ArticlePage extends AbstractPage implements IDisposable{

    constructor() {
        super();
        this.element.innerText = 'articlePage';
    }



    dispose(): void {

    }
}