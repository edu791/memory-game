export type CardObject = {
  id: number;
  groupId: number;
  content: string;
  isSelected: boolean;
  isMatched: boolean;
  matchResult: 'success' | 'failed' | null;
};
