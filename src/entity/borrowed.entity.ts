export interface IBorrow {
  readonly _id: string;
  code: string;
  book_id: string;
  member_id: string;
  date_borrowed: Date;
  date_returned: Date;
  status: string;
  created_at: Date;
  updated_at: Date;
}
