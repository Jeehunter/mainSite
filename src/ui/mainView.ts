import { IDisposable } from '../common/lifecycle';
import { LanguageService } from '../server/languageService';
import { LayoutService } from '../server/layoutService';
import { ViewService } from '../server/viewService';


export class MainView implements IDisposable {
    private element: HTMLElement = document.createElement('div');

    constructor(layoutService: LayoutService, languageService: LanguageService, viewService: ViewService) {

        viewService.onDidChangeSidebarSelectView((e) => {
            document.title = languageService.localize('baseInfo.ownerName', 'coldRoom') + '-' + e.displayName;
            console.log(e, 'fffffffffffffffffffff')
        })
    }


    render(parent: HTMLElement) {
        parent.appendChild(this.element);
    }


    dispose(): void {
        throw new Error("Method not implemented.");
    }


}
