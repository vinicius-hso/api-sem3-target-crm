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

  // pipeline?: string;
  // company?: string;
  // contact?: string;
  // name?: string;
  // deadline?: Date;
  // priority?: string;
  // value?: number;
  // tag?: string;
  // status?: string;
  // activity?: any;
}

export type DealInfoType = Pick<DealTypes, "value">
