import { IDisposable } from "../common/lifecycle";


export class SideBar implements IDisposable {
    private element:HTMLElement;
    
    constructor(){
        this.element = document.createElement('div');
        this.element.classList.add('side-bar')
    }

    render(parent:HTMLElement){
        parent.appendChild(this.element)
    }


    dispose(): void {
        
    }
}