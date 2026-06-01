import assert from "node:assert/strict";
import { isValidPayPeriodBackup } from "./validatePayPeriodBackup.js";

/**
 * 1. Valid Backup
 */

const validBackup = {
  id: "active",
  schemaVersion: 1,
  jobs: [],
  expenses: [],
  mileageEntries: [
    {
      id: "mileage-1",
      payPeriodId: "active",
      date: "2026-05-07",
      vehicle: "Truck",
      startLocation: "Yard",
      endLocation: "Rig",
      businessPurpose: "Field work",
      miles: 123,
      mileageRateSnapshot: 0.67,
      notes: "",
      createdAt: "2026-05-07T12:00:00.000Z",
      updatedAt: "2026-05-07T12:00:00.000Z",
    },
  ],
};

assert.equal(isValidPayPeriodBackup(validBackup), true);

const validGenericJob = {
  id: "job-generic",
  payPeriodId: "active",
  clientCompany: "Example Inspection Group",
  workType: "hourly_work",
  siteLocation: "Inspection Route 3",
  referenceNumber: "WO-300",
  date: "2026-05-08",
  hoursWorked: 7.5,
  hourlyRateSnapshot: 32,
  travelReimbursement: 18,
  notes: "Routine inspection",
  totalPay: 240,
  createdAt: "2026-05-08T12:00:00.000Z",
  updatedAt: "2026-05-08T12:00:00.000Z",
};

const validLegacyJob = {
  id: "job-legacy",
  payPeriodId: "active",
  date: "2026-05-09",
  company: "Demo Field Services",
  rigNameOrNumber: "Rig 12",
  fieldTicketNumber: "FT-100",
  transportation: 25,
  ticketPhotoId: "",
  jobType: "bucking",
  buckingState: "Texas",
  jobsCompleted: 1,
  hoursPerJob: 6,
  hoursWorked: 6,
  baseJobPay: 0,
  additionalHours: 0,
  hourlyRateSnapshot: 28,
  totalPay: 168,
  createdAt: "2026-05-09T12:00:00.000Z",
  updatedAt: "2026-05-09T12:00:00.000Z",
};

const validCurrentFormGenericJob = {
  ...validGenericJob,
  id: "job-current-form-generic",
  clientCompany: undefined,
  workType: undefined,
  company: "Sample Repair Co",
  jobType: "hourly_work",
};

const validLegacyTorqueTurnJob = {
  ...validLegacyJob,
  id: "job-legacy-torque-turn",
  jobType: "torque_turn",
  baseJobPay: 750,
  additionalHours: undefined,
  totalJobHours: 2,
  totalPay: 806,
};

assert.equal(isValidPayPeriodBackup({ ...validBackup, jobs: [validGenericJob] }), true);
assert.equal(isValidPayPeriodBackup({ ...validBackup, jobs: [validCurrentFormGenericJob] }), true);
assert.equal(isValidPayPeriodBackup({ ...validBackup, jobs: [validLegacyJob, validLegacyTorqueTurnJob] }), true);
assert.equal(isValidPayPeriodBackup({ ...validBackup, jobs: [validGenericJob, validLegacyJob] }), true);

assert.equal(
  isValidPayPeriodBackup({
    ...validBackup,
    expenses: [
      {
        id: "expense-1",
        payPeriodId: "active",
        receiptPhotos: [{ id: "receipt-photo-1", name: "Fuel receipt" }],
        date: "2026-05-07",
        vendor: "Pilot",
        category: "Fuel",
        amount: 50,
        notes: "",
        createdAt: "2026-05-07T12:00:00.000Z",
        updatedAt: "2026-05-07T12:00:00.000Z",
      },
    ],
  }),
  true,
);

/**
 * 2. Invalid Backup
 */

assert.equal(isValidPayPeriodBackup({ ...validBackup, schemaVersion: "bad" }), false);
assert.equal(isValidPayPeriodBackup({ ...validBackup, mileageEntries: "bad" }), false);
assert.equal(
  isValidPayPeriodBackup({
    ...validBackup,
    jobs: [{ ...validGenericJob, hoursWorked: "bad" }],
  }),
  false,
);
assert.equal(
  isValidPayPeriodBackup({
    ...validBackup,
    jobs: [{ ...validLegacyJob, transportation: "bad" }],
  }),
  false,
);
assert.equal(
  isValidPayPeriodBackup({
    ...validBackup,
    mileageEntries: [{ ...validBackup.mileageEntries[0], miles: 0 }],
  }),
  false,
);

console.log("validatePayPeriodBackup tests passed");
