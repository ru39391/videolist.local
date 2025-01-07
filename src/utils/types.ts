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

export type TItemDataKeys = keyof TItemData;

export type TTagData = {
  id: number;
  name: string;
  createdon: string;
  updatedon: string | null;
  counter?: number;
}

export type TTagDataKeys = keyof TTagData;

export type TLinkData = {
  caption: string;
  href: string;
  savedon: string;
  tag: string;
}

export type THandledLinkData = {
  name: string;
  alias: string;
  item_id: string;
  url: string;
  savedon: string;
  tag: string;
}
