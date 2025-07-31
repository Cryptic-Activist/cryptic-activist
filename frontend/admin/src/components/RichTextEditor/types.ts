
import type { ContentBlock, ContentState } from 'draft-js';

export interface LinkProps {
  children: React.ReactNode;
  contentState: ContentState;
  entityKey: string;
}

export interface ImageProps {
  block: ContentBlock;
  contentState: ContentState;
}
