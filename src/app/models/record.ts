import { IRecord } from './i-record';
import { IBlock } from './i-block';

export class Record implements IRecord {
    id: string;
    time: number;
    blocks: Array<IBlock>;
}