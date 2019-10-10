import { IRecordBlockDto } from './i-record-block-dto';
import { IRecordDto } from './i-record-dto';

export class RecordDto implements IRecordDto {
    time: number;
    blocks: Array<IRecordBlockDto>;
}