export type TCustomData<T> = Record<string, T>

export type TItemData = {
  id: number;
  name: string;
  alias: string;
  item_id: string;
  url: string;
  duration: string;
  createdon: string;
  updatedon: string | null;
  publishedon: string | null;
  savedon: string;
  author: number;
  channel: number;
  tag: number;
  isDownloaded: number;
  isViewed: number;
  date?: number;
  category?: string;
}

export type TTagData = {
  id: number;
  name: string;
  createdon: string;
  updatedon: string | null;
  counter?: number;
}
