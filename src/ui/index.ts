/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Jeehunter Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDisposable } from '../common/lifecycle';
import { mainStyle } from '../main.style';
import { AuthService, IAuthService } from '../server/authService';
import { LanguageService } from '../server/languageService';
import { LayoutService } from '../server/layoutService';
import { ViewService } from '../server/viewService';
import { Button } from '../ui-component/button/button';
import { SideBar } from './sidebar';

export class MainUi implements IDisposable {

    private mainDom: HTMLElement;

    private sideBar: SideBar;


    constructor(
        authService: AuthService,
        layoutService: LayoutService,
        languageService: LanguageService,
        viewService: ViewService
    ) {
        this.mainDom = document.createElement('div');
        this.mainDom.classList.add('main');

        authService.setAuthData('data');
        authService.onDidGetRemoteAuthData((e) => {
            console.log('eeeeeeee', e);
        });
        this.sideBar = new SideBar(layoutService, languageService, viewService);

        const _style = document.createElement('style');
        _style.appendChild(document.createTextNode(mainStyle));
        document.head.appendChild(_style);
    }

    render() {
        this.sideBar.render(this.mainDom);
        document.body.appendChild(this.mainDom);
    }

    dispose(): void {
        console.log('log');
    }
}


