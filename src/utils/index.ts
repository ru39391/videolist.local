import type {
  TCustomData,
  TItemData,
  TTagData,
  TItemDataKeys,
  TTagDataKeys
} from './types';

const fetchArray = (arr: TCustomData<string | number>[], param: string): TCustomData<string | number>[] => {
  return arr.reduce((acc: TCustomData<string | number>[], item: TCustomData<string | number>) => {
    if(acc.find(data => data[param] === item[param])) {
      return acc;
    } else {
      return [...acc, item];
    }
  }, []);
};

const handleDate = (value: string): number => {
  const date = new Date(value.replace(' ', 'T'));

  return Math.floor(date.getTime() / 1000);
}

const sortArrValues = (arr: TItemData[] | TTagData[], key: string, dir: string = 'ASC'): TItemData[] | TTagData[] => {
  const handleStrValue = (value: string): string => value !== null && value !== undefined ? value.toString().toLowerCase() : '';

  const handleNumValue = (value: number): number => value !== null && value !== undefined ? Number(value) : 0;

  const handleValue = (value: string | number | null | undefined): string | number => typeof value === 'string'
    ? handleStrValue(value as string)
    : handleNumValue(value as number);

  const isItemData = (item: TItemData | TTagData): item is TItemData => typeof key in item;

  const array = arr.sort((a: TItemData | TTagData, b: TItemData | TTagData) => {
    const valueA = handleValue(
      isItemData(a) ? ({...a} as TItemData)[key as TItemDataKeys] : ({...a} as TTagData)[key as TTagDataKeys]
    );
    const valueB = handleValue(
      isItemData(b) ? ({...b} as TItemData)[key as TItemDataKeys] : ({...b} as TTagData)[key as TTagDataKeys]
    );

    if(valueA < valueB) {
      return -1;
    }
    if(valueA > valueB) {
      return 1;
    }
    return 0;
  });

  return dir === 'ASC' ? array : array.reverse();
}

export {
  fetchArray,
  handleDate,
  sortArrValues
}
