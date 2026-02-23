import type { ReportData } from '@/types/report';

export const reportData: ReportData = {
  "_id": "6999c3d9907414e620a6e608",
  "STATE": {
    "id": "telangana",
    "name": "Telangana"
  },
  "TEMPLATE": {
    "key": "TEMPLATE_1",
    "name": "Classic",
    "code": 1,
    "url": "https://jaaga-public-1722574714.s3.ap-south-1.amazonaws.com/states/andhra-pradesh/document/non-agriculture/ap_property_binder.png"
  },
  "SR_CODE": {
    "name": " Sub Registrar Office (SRO)",
    "id": "SR_CODE",
    "value": {
      "_id": "67055c37041c36adb6036df2",
      "name": "RANGA REDDY (R.O)",
      "code": "1510"
    }
  },
  "DOCUMENT_NUMBER": {
    "name": "Document No",
    "id": "DOCUMENT_NUMBER",
    "value": 121
  },
  "YEAR": {
    "name": "Registration Year (YYYY)",
    "id": "YEAR",
    "value": "2025"
  },
  "PTIN": {
    "name": "Property Tax Number(PTIN)",
    "id": "PTIN",
    "value": "1090109080"
  },
  "services": [
    {
      "id": "sale-deed",
      "name": "Sale Deed/Certified Copy"
    }
  ],
  "compareService": {
    "id": "sale-deed",
    "name": "Sale Deed/Certified Copy"
  },
  "type": {
    "id": "lawyer",
    "name": "Lawyer"
  },
  "mode": "non-agriculture",
  "srn": "TS-LAW-1771684825",
  "status": "IN_PROGRESS",
  "createdAt": 1771684825,
  "userId": "6995ac505a5115a76b8f8858",
  "__v": 0,
  "jaagaFetch": {
    "ecRecords": [
      {
        "deedNo": "121",
        "deedDate": "03-01-2025",
        "deedType": "Sale Deed",
        "firstPartyName": "IKYA INFRA PROJECTS REP BY DEVIREDDY RAJASEKHAR REDDY (MANAGING PARTNER), PRAMAHA REAL ESTATES PRIVATE LIMITED REP BY DEVIREDDY RAJASEKHAR REDDY, OBULAREDDY NAGIREDDY, DEVIREDDY RAJASEKHAR REDDY (GPA OF VENDOR NO.3)",
        "secondPartyName": "SUGUNA GANGOLU",
        "sro": "RANGA REDDY (R.O) (1510)"
      }
    ],
    "Property_Investment_Overview": [
      {
        "field": "Registration Value",
        "value": "2823000"
      },
      {
        "field": "Consideration Value",
        "value": "4900000"
      }
    ],
    "propertyInfo": {
      "propertyOwnerName": "SUGUNA GANGOLU",
      "built": "1620SQ. FT",
      "block": "0-1",
      "survey": "34/1",
      "extent": "49SQ.Yds",
      "propertyType": "-",
      "village": "MADEENAGUDA",
      "address": "Flat 501, IKYA'S PELICAN GROVE, MADEENAGUDA",
      "boundaries": {
        "[N]": "OPEN TO SKY",
        "[S]": "OPEN TO SKY",
        "[E]": "LIFT, CORRIDOR AND STAIRCASE",
        "[W]": "OPEN TO SKY"
      }
    },
    "taxdetails": {
      "propertyId": "1090109080",
      "ownerName": "Pentakota V S S Manikanta Ramya",
      "locality": "40-Kavadiguda",
      "plinthArea": 0,
      "annualTax": 4296,
      "arrearTax": "N/A"
    },
    "AIGeneratedDescription": [
      {
        "issue": "Owner name mismatch",
        "ecValue": "SUGUNA GANGOLU",
        "taxValue": "Pentakota V S S Manikanta Ramya",
        "comment": "The owner name in the EC record (buyer/current owner) differs from the owner name in the property tax record."
      },
      {
        "issue": "Village/Locality mismatch",
        "ecValue": "MADEENAGUDA",
        "taxValue": "40-Kavadiguda",
        "comment": "The village/locality mentioned in the EC record differs from the locality in the property tax record."
      },
      {
        "issue": "Built area mismatch",
        "ecValue": "1620SQ. FT",
        "taxValue": "0",
        "comment": "The built area specified in the EC record is different from the plinth area recorded in property tax."
      },
      {
        "issue": "Potential investment concern: Consideration vs Registration Value",
        "ecValue": "Registration Value: 2823000, Consideration Value: 4900000",
        "taxValue": "-",
        "comment": "The consideration value is significantly higher than the registration value, which may indicate an undeclared cash component or premium paid."
      }
    ]
  },
  "updatedAt": 1771684947
};
