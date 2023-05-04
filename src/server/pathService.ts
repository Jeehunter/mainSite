// import { EventEmitter } from '../common/event';

// export interface IRemoteData {
//     token: string
// }


// export class PathService {

//     private token?: string;
//     private static pathService: PathService = new PathService();
//     private _onDidGetRemoteAuthData = new EventEmitter<IRemoteData>();
//     public onDidGetRemoteAuthData = this._onDidGetRemoteAuthData.asSubscriber('onDidGetRemoteAuthData');

//     private constructor() {
        
//     }

//     public static getInstance() {
//         return PathService.pathService;
//     }

//     public setAuthData(token: string) {
//         this.token = token;
//         setTimeout(() => {
//             this._onDidGetRemoteAuthData.emit('onDidGetRemoteAuthData', { token: 'tokennnnnnnnnn' });
//         }, 1000);
//     }

//     public getLocalAuthData() {
//         return this.token;
//         // window.localStorage.getItem('token')
//     }
// }
