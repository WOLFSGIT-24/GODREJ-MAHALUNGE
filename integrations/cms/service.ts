import { WixDataItem, WixDataQueryResult } from './types';

export interface PaginationOptions {
  limit?: number;
  skip?: number;
}

// Initial seed data for Symphony Heights by Disha Properties
const initialData: Record<string, WixDataItem[]> = {};

const store: Record<string, WixDataItem[]> = { ...initialData };

function createQueryResult<T extends WixDataItem>(
  items: T[],
  totalCount: number,
  limit: number,
  skip: number
): WixDataQueryResult<T> {
  const currentPage = Math.floor(skip / limit);
  const totalPages = Math.ceil(totalCount / limit) || 1;

  return {
    items,
    totalCount,
    length: items.length,
    pageSize: limit,
    currentPage,
    totalPages,
    hasNext: () => (currentPage + 1) * limit < totalCount,
    hasPrev: () => currentPage > 0,
    next: async () => {
      const nextSkip = skip + limit;
      return createQueryResult(items.slice(nextSkip, nextSkip + limit), totalCount, limit, nextSkip);
    },
    prev: async () => {
      const prevSkip = Math.max(0, skip - limit);
      return createQueryResult(items.slice(prevSkip, prevSkip + limit), totalCount, limit, prevSkip);
    },
  };
}

export class BaseCrudService {
  static async getAll<T extends WixDataItem>(
    collectionId: string,
    options?: PaginationOptions
  ): Promise<WixDataQueryResult<T>> {
    const limit = options?.limit ?? 50;
    const skip = options?.skip ?? 0;

    const collection = (store[collectionId] || []) as T[];
    const paginatedItems = collection.slice(skip, skip + limit);

    return createQueryResult<T>(paginatedItems, collection.length, limit, skip);
  }

  static async getById<T extends WixDataItem>(
    collectionId: string,
    itemId: string
  ): Promise<T | null> {
    const collection = (store[collectionId] || []) as T[];
    const item = collection.find((i) => i._id === itemId);
    return item ? ({ ...item } as T) : null;
  }

  static async create<T extends WixDataItem>(
    collectionId: string,
    item: Partial<T>
  ): Promise<T> {
    if (!store[collectionId]) {
      store[collectionId] = [];
    }

    const newItem = {
      _id: item._id || crypto.randomUUID(),
      _createdDate: new Date(),
      _updatedDate: new Date(),
      ...item,
    } as T;

    store[collectionId].push(newItem);
    return { ...newItem };
  }

  static async update<T extends WixDataItem>(
    collectionId: string,
    item: Partial<T> & { _id: string }
  ): Promise<T> {
    if (!store[collectionId]) {
      store[collectionId] = [];
    }

    const index = store[collectionId].findIndex((i) => i._id === item._id);
    if (index === -1) {
      throw new Error(`Item with id ${item._id} not found in collection ${collectionId}`);
    }

    const updatedItem = {
      ...store[collectionId][index],
      ...item,
      _updatedDate: new Date(),
    } as T;

    store[collectionId][index] = updatedItem;
    return { ...updatedItem };
  }

  static async delete(collectionId: string, itemId: string): Promise<boolean> {
    if (!store[collectionId]) return false;

    const initialLength = store[collectionId].length;
    store[collectionId] = store[collectionId].filter((i) => i._id !== itemId);
    return store[collectionId].length < initialLength;
  }
}
