import * as _ from 'lodash';
import { EventEmitter } from '../common/event';
import * as zh_JSON from './i18n.zh.json';

export enum Language {
    CN = 'zh',
    EN = 'en'
}



export class LanguageService {
    private static languageService: LanguageService = new LanguageService();
    private _onDidChangeLanguage = new EventEmitter<Language>();
    public onDidChangeLanguage = this._onDidChangeLanguage.asSubscriber('onDidChangeLanguage');
    private _cnJsonMap: Map<string, string>;

    private _language: Language = Language.CN;

    private constructor() {
        this._cnJsonMap = new Map();
        for (const key in zh_JSON) {
            if (!Object.hasOwnProperty.call(zh_JSON, key) || key === 'default') {
                continue;
            }
            this._cnJsonMap.set(key, zh_JSON[key as keyof object]);
        }
    }

    public setLanguage(language: Language): void {
        this._language = language;
        this._onDidChangeLanguage.emit('onDidChangeLanguage', language);
    }

    public localize(id: string, defaultValue: string): string {
        return this.language === Language.CN && this._cnJsonMap.has(id) ? this._cnJsonMap.get(id) : defaultValue;
    }

    get language() {
        return this._language;
    }

    public static getInstance() {
        return LanguageService.languageService;
    }
}
