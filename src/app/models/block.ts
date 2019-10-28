import { IBlock } from './i-block';
import { IBlockContent } from './i-block-content';

export class Block implements IBlock {
    type: string;
    data: IBlockContent;
}