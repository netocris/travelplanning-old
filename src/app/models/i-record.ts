import { IBlock } from './i-block';

export interface IRecord {
    id: string;
    time: number;
    blocks: Array<IBlock>;
}