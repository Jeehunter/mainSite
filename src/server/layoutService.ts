import { EventEmitter } from '../common/event';


export interface ISize {
    width?: number;
    height?: number;
}

export const MIN_DEVICE_WIDTH = 720;

export class LayoutService {
    private static layoutService: LayoutService = new LayoutService();
    private _onDidChangeWindowSize = new EventEmitter<ISize>();
    public onDidChangeWindowSize = this._onDidChangeWindowSize.asSubscriber('onDidChangeWindowSize');

    private constructor() {
        window.onresize = () => {
            this._onDidChangeWindowSize.emit('onDidChangeWindowSize', { width: document.body.clientWidth, height: document.body.clientHeight });
        };
    }

    public getWindowSize(): ISize {
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        };
    }

    public static getInstance() {
        return LayoutService.layoutService;
    }
}
