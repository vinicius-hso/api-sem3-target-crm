export interface DealTypes {
  id?: string;
  name?: string;
  company?: any;
  contact?: any;
  pipeline?: any;
  deadline?: string;
  priority?: string;
  value?: any;
  tag?: any;
  status?: string;
  activity?: any[];
}

export type DealInfoType = Pick<DealTypes, "value">;
