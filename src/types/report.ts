export interface ReportData {
  _id: string;
  STATE: {
    id: string;
    name: string;
  };
  TEMPLATE?: {
    key: string;
    name: string;
    code: number;
    url: string;
  };
  SR_CODE: {
    name: string;
    id: string;
    value: {
      _id: string;
      name: string;
      code: string;
    };
  };
  DOCUMENT_NUMBER: {
    name: string;
    id: string;
    value: number;
  };
  YEAR: {
    name: string;
    id: string;
    value: string;
  };
  PTIN: {
    name: string;
    id: string;
    value: string;
  };
  services?: { id: string; name: string }[];
  compareService?: { id: string; name: string };
  type?: { id: string; name: string };
  mode?: string;
  srn: string;
  status: string;
  createdAt?: number;
  userId?: string;
  __v?: number;
  jaagaFetch: {
    ecRecords: ECRecord[];
    Property_Investment_Overview: PropertyInvestment[];
    propertyInfo: PropertyInfo;
    taxdetails: TaxDetails;
    AIGeneratedDescription: AIGeneratedDescriptionItem[];
  };
  updatedAt?: number;
}

export interface ECRecord {
  deedNo: string;
  deedDate: string;
  deedType: string;
  firstPartyName: string;
  secondPartyName: string;
  sro: string;
}

export interface PropertyInvestment {
  field: string;
  value: string;
}

export interface PropertyInfo {
  propertyOwnerName: string;
  built: string;
  block: string;
  survey: string;
  extent: string;
  propertyType: string;
  village: string;
  address: string;
  boundaries: {
    "[N]": string;
    "[S]": string;
    "[E]": string;
    "[W]": string;
  };
}

export interface TaxDetails {
  propertyId: string;
  ownerName: string;
  locality: string;
  plinthArea: number | string;
  annualTax: number | string;
  arrearTax: string;
}

export interface AIGeneratedDescriptionItem {
  issue: string;
  ecValue?: string;
  taxValue?: string;
  comment: string;
}
