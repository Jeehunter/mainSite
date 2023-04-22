import { EventEmitter } from "../common/event";


export enum Language {
    CN = 'zh',
    EN = 'en'
}



export class LanguageService {
    private static languageService: LanguageService = new LanguageService();
    private _onDidChangeLanguage = new EventEmitter<Language>();
    public onDidChangeLanguage = this._onDidChangeLanguage.asSubscriber('onDidChangeLanguage');

    private _language:Language = Language.CN;

    private constructor() {

    }

    public setLanguage(language:Language): void {
        this._language = language;
        this._onDidChangeLanguage.emit('onDidChangeLanguage',language)
    }

    get language(){
        return this._language;
    }

    public static getInstance() {
        return LanguageService.languageService;
    }
}
