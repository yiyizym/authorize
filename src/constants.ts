export const SUCCESS = 0;
export const INITIAL_ID = -1;

export enum PERMISSION {

}

export enum USER_PERMISSION_MAP {
  page_a_read = 1000,
  page_a_write = 1001,
  page_b_read = 1002,
  page_b_write = 1003
}

export interface Match {
  url: string;
  params: {

  };
}

export interface Permission {
  list: number[]
}