/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Jeehunter Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDisposable } from '../common/lifecycle';
import { indexStyle } from './index.style';
import { AuthService, IAuthService } from '../server/authService';
import { LanguageService } from '../server/languageService';
import { ITheme, LayoutService } from '../server/layoutService';
import { ViewService } from '../server/viewService';
import { MainView } from './mainView';
import { SideBar } from './sidebar';

export class MainUi implements IDisposable {

    private mainDom: HTMLElement;

    private sideBar: SideBar;
    private mainView: MainView;

    constructor(
        authService: AuthService,
        layoutService: LayoutService,
        languageService: LanguageService,
        viewService: ViewService
    ) {
        this.mainDom = document.createElement('div');
        this.mainDom.classList.add('main');

        layoutService.onDidChangeTheme((e) => {
            console.log(e,'e')
            this.setTheme(e);
        })
        layoutService.changeTheme(ITheme.Light);


        authService.setAuthData('data');
        authService.onDidGetRemoteAuthData((e) => {
            console.log('eeeeeeee', e);
        });
        this.sideBar = new SideBar(layoutService, languageService, viewService);
        this.mainView = new MainView(layoutService, languageService, viewService);

        const _style = document.createElement('style');
        _style.appendChild(document.createTextNode(indexStyle));
        document.head.appendChild(_style);
    }

    setTheme(theme:ITheme){
        switch (theme) {
            case ITheme.Black:
                this.mainDom.classList.add('black');
                this.mainDom.classList.remove('light');
                break;
            case ITheme.Light:
                this.mainDom.classList.add('light');
                this.mainDom.classList.remove('black');
                break;
            default:
                this.mainDom.classList.add('light');
                this.mainDom.classList.remove('black');
                break;
        }
    }

    render() {
        this.sideBar.render(this.mainDom);
        this.mainView.render(this.mainDom);
        document.body.appendChild(this.mainDom);
    }

    dispose(): void {
        console.log('log');
    }
}


