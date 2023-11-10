export interface userData {
  data: User[];
  timestamp: string;
  status: string;
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPage: number;
  last: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  roles: string;
  phoneNumber: string;
  locations: string[]
}
