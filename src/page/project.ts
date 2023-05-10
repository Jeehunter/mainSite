import { IDisposable } from '../common/lifecycle';
import { AbstractPage } from './abstractPage';



export class ProjectPage extends AbstractPage implements IDisposable {

    constructor(){
        super();

        this.element.innerText = 'project';
    }


    dispose(): void {
        
    }
}