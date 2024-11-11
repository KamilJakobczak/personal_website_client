// enums
//
export enum BookStatus {
  READ = 'READ',
  UNREAD = 'UNREAD',
  WANTEDTOBUY = 'WANTEDTOBUY',
  WANTEDTOREAD = 'WANTEDTOREAD',
}

export enum CoverTypes {
  PAPERBACK = 'PAPERBACK',
  HARDCOVER = 'HARDCOVER',
  EBOOK = 'EBOOK',
}

export enum Currency {
  EUR = 'EUR',
  PLN = 'PLN',
  USD = 'USD',
}
//
// types
//
export type Edition = {
  editionNumber: string;
  editionYear: string;
};

export type CoverCheckboxes = {
  id: number;
  type: CoverTypes;
  checked: boolean;
  edition: Edition;
  buyPrice: string;
  currency?: Currency;
};

export type PurchasedBookInfo = {
  buyPrice: number;
  coverType: CoverTypes;
  currency: Currency;
  edition: Edition;
};

export type UserBookDetailsType = {
  rating?: number;
  status: BookStatus;
  whenRead?: number;
  purchasedBookInfo: PurchasedBookInfo[];
};

export type RecordType =
  | 'author'
  | 'book'
  | 'genre'
  | 'publisher'
  // | 'profile'
  | 'translator'
  // | 'user'
  | 'bookSeries'
  // | 'customCollection'
  // | 'userBookDetails';
  | undefined;

// export type SingleRecordType = {
//   data: {
//     id: string;
//     books: [];
//   };
//   editable: boolean;
// };
