import { IUserSettings } from './i-user-settings';

export class UserSettings implements IUserSettings {
    id: string;
    language: string;
    darkMode: boolean;
}