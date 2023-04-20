
export interface IAuthService {
    setAuthData(token:string): void;
    getLocalAuthData(): string;
}

export class AuthService {

    private token?: string;
    private static authService: AuthService = new AuthService;
    private _onDidGetRemoteAuthData:

    private constructor() {

    }

    public static getInstance() {
        return AuthService.authService;
    }

    public setAuthData(token: string) {
        this.token = token
    }

    public getLocalAuthData() {
        return this.token;
        // window.localStorage.getItem('token')
    }
}




// export class AuthService {
//     private token?: string;

//     private constructor() {
//     }

//     private static AuthService: AuthService = new AuthService;
//     public static getInstance(): AuthService {
//         if (AuthService.instance === null) {
//             AuthService.instance = new AuthService()
//         }
//         return AuthService.instance;
//     }

//     public setAuthData(token:string) {
//         this.token = token
//     }

//     public getLocalAuthData() {
//         return this.token;
//         // window.localStorage.getItem('token')
//     }
// }
