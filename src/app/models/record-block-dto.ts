import { IRecordBlockDto } from './i-record-block-dto';

export class RecordBlockDto implements IRecordBlockDto {
    type: string;
    value: string;    
}