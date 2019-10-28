import { IBlockContent } from './i-block-content';

export interface IBlock {
    type: string;
    data: IBlockContent;
}