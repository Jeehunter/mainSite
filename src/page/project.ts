import { IDisposable } from '../common/lifecycle';
import { LanguageService } from '../server/languageService';
import { LayoutService } from '../server/layoutService';
import { ViewService } from '../server/viewService';
import { AbstractPage } from './abstractPage';



export class ProjectPage extends AbstractPage implements IDisposable {

    constructor(layoutService?: LayoutService, languageService?: LanguageService, viewService?: ViewService){
        super(layoutService, languageService, viewService);

        this.element.innerText = 'project';
    }


    dispose(): void {
        
    }
}