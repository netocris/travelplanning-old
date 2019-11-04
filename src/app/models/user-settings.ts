import { IUserSettings } from './i-user-settings';

export class UserSettings implements IUserSettings {
    uid: string;
    lang: string;
    darkMode: boolean;
}