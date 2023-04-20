/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Jeehunter Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDisposable } from "../common/lifecycle";
import { AuthService, IAuthService } from "../server/authService";
import { Button } from "../ui-component/button/button";
import { SideBar } from "./sidebar";

export class MainUi implements IDisposable {

    private mainDom: HTMLElement;

    private sideBar: SideBar;


    constructor(
        authService: AuthService
    ) {
        this.mainDom = document.createElement('div');
        authService.setAuthData('data');
        const button = new Button();
        this.mainDom.append(button);

        this.sideBar = new SideBar();
        
    }

    render() {
        this.sideBar.render(this.mainDom)
        document.body.appendChild(this.mainDom);
    }

    dispose(): void {

    }
}


