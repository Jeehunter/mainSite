import { EventEmitter } from '../common/event';

export interface IViewPath {
    id: string,
    displayName: string,
    path: string
}

export class ViewService {
    private static viewService: ViewService = new ViewService();
    private _onDidChangeSidebarSelectView = new EventEmitter<IViewPath>();
    public onDidChangeSidebarSelectView = this._onDidChangeSidebarSelectView.asSubscriber('onDidChangeWindowSize');

    

    private constructor() {
        
    }

    public setSidebarSelectView(path: IViewPath) {
        this._onDidChangeSidebarSelectView.emit('onDidChangeSidebarSelectView', path);
    }

    public static getInstance() {
        return ViewService.viewService;
    }
}
