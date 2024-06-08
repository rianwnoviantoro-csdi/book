export interface IMember {
  readonly _id: string;
  name: string;
  code: string;
  is_penalized: boolean;
  end_of_penalized: Date;
  created_at: Date;
  updated_at: Date;
}
