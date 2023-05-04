import { EventEmitter } from '../common/event';

export interface IAuthService {
    setAuthData(token: string): void;
    getLocalAuthData(): string;
}

export interface IRemoteData {
    token: string
}


export class AuthService implements IAuthService{

    private token?: string;
    private static authService: AuthService = new AuthService();
    private _onDidGetRemoteAuthData = new EventEmitter<IRemoteData>();
    public onDidGetRemoteAuthData = this._onDidGetRemoteAuthData.asSubscriber('onDidGetRemoteAuthData');

    private constructor() {
        
    }

    public static getInstance() {
        return AuthService.authService;
    }

    public setAuthData(token: string) {
        this.token = token;
        setTimeout(() => {
            this._onDidGetRemoteAuthData.emit('onDidGetRemoteAuthData', { token: 'tokennnnnnnnnn' });
        }, 1000);
    }

    public getLocalAuthData() {
        return this.token;
        // window.localStorage.getItem('token')
    }
}
