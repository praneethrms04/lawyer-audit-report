export interface ReportData {
  _id: string;
  STATE: {
    value: {
      name: string;
      code: string;
    };
  };
  SR_CODE: {
    value: {
      name: string;
      code: string;
    };
  };
  DOCUMENT_NUMBER: {
    value: string;
  };
  YEAR: {
    value: string;
  };
  PTIN: {
    value: string;
  };
  srn: string;
  status: string;
  jaagaFetch: {
    ecRecords: ECRecord[];
    Property_Investment_Overview: PropertyInvestment[];
    propertyInfo: PropertyInfo;
    taxdetails: TaxDetails;
    AIGeneratedDescription: string[];
  };
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
  "Registration Value": string;
  "Consideration Value": string;
}

export interface PropertyInfo {
  Owner: string;
  "Built Area": string;
  Survey: string;
  Block: string;
  Extent: string;
  Village: string;
  Address: string;
  Boundaries: {
    North: string;
    South: string;
    East: string;
    West: string;
  };
}

export interface TaxDetails {
  PropertyID: string;
  OwnerName: string;
  Locality: string;
  PlinthArea: string;
  AnnualTax: string;
  ArrearTax: string;
}
