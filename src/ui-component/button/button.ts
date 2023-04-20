import { BaseComponent, defineCustomElement } from "../../common/common";
import { IDisposable } from "../../common/lifecycle";
import { AuthService } from "../../server/authService";

export class Button extends BaseComponent implements IDisposable {



    constructor() {
        super();
        const authService1 = AuthService.getInstance();
        console.log(authService1.getLocalAuthData())
        
    }

    dispose(): void {
        throw new Error("Method not implemented.");
    }

}

defineCustomElement('ui-button',Button)