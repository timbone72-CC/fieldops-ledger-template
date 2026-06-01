import assert from "node:assert/strict";
import { buildPayPeriodCsv } from "./payPeriodCsv.js";

const payPeriod = {
  label: "May 2026",
  startDate: "2026-05-01",
  endDate: "2026-05-15",
  jobs: [
    {
      jobType: "hourly_work",
      date: "2026-05-01",
      company: "Example Inspection Group",
      siteLocation: "Inspection Route 3",
      rigNameOrNumber: "Legacy Rig Should Not Export",
      referenceNumber: "WO-300",
      fieldTicketNumber: "Legacy Ticket Should Not Export",
      hoursWorked: 7.5,
      travelReimbursement: 18,
      transportation: 99,
      totalPay: 240,
    },
    {
      jobType: "bucking",
      date: "2026-05-02",
      company: "Demo Client",
      rigNameOrNumber: "Rig 12",
      fieldTicketNumber: "FT-100",
      hoursWorked: 6,
      transportation: 25,
      totalPay: 168,
    },
    {
      jobType: "torque_turn",
      date: "2026-05-03",
      company: "Demo Client",
      rigNameOrNumber: "Rig 14",
      fieldTicketNumber: "FT-200",
      baseJobPay: 1400,
      additionalHours: 7,
      transportation: 0,
      totalPay: 1596,
    },
  ],
  mileageEntries: [
    {
      miles: 10,
      mileageRateSnapshot: 0.67,
      businessPurpose: "Test mileage",
    },
  ],
};

const csv = buildPayPeriodCsv(payPeriod);
const rows = csv.split("\n").map((row) => row.split(","));

const headerRow = rows.find((row) => row[0] === "Date");
assert.deepEqual(headerRow, [
  "Date",
  "Client / Company",
  "Site / Location",
  "Reference Number",
  "Base Pay",
  "Hours Worked",
  "Travel Reimbursement",
  "Total",
]);

const hourlyWorkRow = rows.find((row) => row[3] === "WO-300");
assert.deepEqual(hourlyWorkRow, [
  "2026-05-01",
  "Example Inspection Group",
  "Inspection Route 3",
  "WO-300",
  "",
  "7.5",
  "18",
  "240",
]);

const buckingRow = rows.find((row) => row[3] === "FT-100");
assert.deepEqual(buckingRow, [
  "2026-05-02",
  "Demo Client",
  "Rig 12",
  "FT-100",
  "",
  "6",
  "25",
  "168",
]);

const torqueTurnRow = rows.find((row) => row[3] === "FT-200");
assert.deepEqual(torqueTurnRow, [
  "2026-05-03",
  "Demo Client",
  "Rig 14",
  "FT-200",
  "1400",
  "7",
  "0",
  "1596",
]);

const grandTotalRow = rows.find((row) => row[0] === "Grand Total");
assert.deepEqual(grandTotalRow, ["Grand Total", "", "", "", "", "", "", "2004"]);

assert.doesNotMatch(csv, /mileageEntries/);
assert.doesNotMatch(csv, /mileageRateSnapshot/);
assert.doesNotMatch(csv, /businessPurpose/);

console.log("payPeriodCsvExport tests passed");
