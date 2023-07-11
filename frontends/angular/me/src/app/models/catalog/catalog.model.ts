import { ICatalogItem } from './catalog-item.model';

export interface ICatalog {
    pageIndex: number;
    data: ICatalogItem[];
    pageSize: number;
    count: number;
}
