export interface IUserResponse {
  id: BigInt;
  names: {
    first_name: string;
    last_name: string;
  };
  username: string;
  is_verified: boolean;
  created_at: Date;
  updated_at: null | Date;
  profile_image?: {
    id?: BigInt;
    name?: string;
    key?: string;
    url?: string;
    created_at?: Date;
    updated_at?: null | Date;
  };
  languages?: {
    id?: BigInt;
    name?: string;
    is_deleted?: boolean;
    when_deleted?: null | Date;
    createdAt?: Date;
    updatedAt?: Date;
  }[];
}
