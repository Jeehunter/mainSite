import { EventEmitter } from '../common/event';


export interface ISize {
    width?: number;
    height?: number;
}

export enum ITheme {
    Black = "black",
    Light = "light"
}

export const MIN_DEVICE_WIDTH = 720;

export class LayoutService {
    private static layoutService: LayoutService = new LayoutService();
    private _onDidChangeWindowSize = new EventEmitter<ISize>();
    public onDidChangeWindowSize = this._onDidChangeWindowSize.asSubscriber('onDidChangeWindowSize');

    private _onDidChangeTheme = new EventEmitter<ITheme>();
    public onDidChangeTheme = this._onDidChangeTheme.asSubscriber('onDidChangeTheme');
    private _theme: ITheme;

    private constructor() {
        window.onresize = () => {
            this._onDidChangeWindowSize.emit('onDidChangeWindowSize', { width: document.body.clientWidth, height: document.body.clientHeight });
        };
    }

    public changeTheme(theme: ITheme) {
        this._onDidChangeTheme.emit('onDidChangeTheme', theme);
        this._theme = theme;
    }

    get theme() {
        return this._theme;
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
