import type { ReportData } from '@/types/report';

export const reportData: ReportData = {
  "_id": "6645d9f0a597e743e45a8a1e",
  "STATE": {
    "value": {
      "name": "KARNATAKA",
      "code": "KA"
    }
  },
  "SR_CODE": {
    "value": {
      "name": "SHIVAJINAGAR",
      "code": "BNG-SJR"
    }
  },
  "DOCUMENT_NUMBER": {
    "value": "1234"
  },
  "YEAR": {
    "value": "2022"
  },
  "PTIN": {
    "value": "1234567890"
  },
  "srn": "SRN-12345-ABCDE",
  "status": "Completed",
  "jaagaFetch": {
    "ecRecords": [
      {
        "deedNo": "SJR-01-12345",
        "deedDate": "2022-01-15",
        "deedType": "Sale Deed",
        "firstPartyName": "John Doe",
        "secondPartyName": "Jane Smith",
        "sro": "SHIVAJINAGAR"
      },
      {
        "deedNo": "SJR-02-54321",
        "deedDate": "2020-05-20",
        "deedType": "Mortgage",
        "firstPartyName": "Jane Smith",
        "secondPartyName": "Major Bank Corp",
        "sro": "SHIVAJINAGAR"
      }
    ],
    "Property_Investment_Overview": [
      {
        "Registration Value": "5,000,000 INR",
        "Consideration Value": "4,800,000 INR"
      }
    ],
    "propertyInfo": {
      "Owner": "Jane Smith",
      "Built Area": "1500 sqft",
      "Survey": "No. 123/4B",
      "Block": "A",
      "Extent": "2400 sqft",
      "Village": "Koramangala",
      "Address": "123, Main St, Koramangala, Bangalore, Karnataka",
      "Boundaries": {
        "North": "Property of Mr. North",
        "South": "Property of Ms. South",
        "East": "Main Road",
        "West": "Park"
      }
    },
    "taxdetails": {
      "PropertyID": "PID-98765",
      "OwnerName": "Jane Smith",
      "Locality": "Koramangala",
      "PlinthArea": "1500 sqft",
      "AnnualTax": "12,500 INR",
      "ArrearTax": "0 INR"
    },
    "AIGeneratedDescription": [
      "Mismatch in owner name between property info ('Jane Smith') and an older EC record ('John Doe' as seller).",
      "An active mortgage is listed on the property from 2020 which may not be closed.",
      "The plinth area in tax details matches the built area in property information, which is a good sign of consistency.",
      "No arrears on property tax, indicating good financial standing."
    ]
  }
};
