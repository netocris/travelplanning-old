import { IRecordBlockDto } from './i-record-block-dto';

export interface IRecordDto {
    time: number;
    blocks: Array<IRecordBlockDto>;
}