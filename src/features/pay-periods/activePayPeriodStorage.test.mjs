import assert from "node:assert/strict";
import { STORAGE_KEYS } from "../../shared/constants/storageKeys.js";

const storage = new Map();

global.window = {
  alert() {},
  localStorage: {
    getItem(key) {
      return storage.has(key) ? storage.get(key) : null;
    },
    setItem(key, value) {
      storage.set(key, value);
    },
    removeItem(key) {
      storage.delete(key);
    },
  },
};

const { loadActivePayPeriod, saveActivePayPeriod } = await import("./activePayPeriodStorage.js");

const mixedPayPeriod = {
  id: "active",
  label: "Migration Safety Test",
  startDate: "2026-05-01",
  endDate: "2026-05-15",
  status: "open",
  schemaVersion: 1,
  jobs: [
    {
      id: "legacy-bucking",
      payPeriodId: "active",
      jobType: "bucking",
      totalPay: 168,
      rigNameOrNumber: "Rig 12",
    },
    {
      id: "legacy-torque-turn",
      payPeriodId: "active",
      jobType: "torque_turn",
      totalPay: 806,
      totalJobHours: 2,
    },
    {
      id: "current-form-hourly-work",
      payPeriodId: "active",
      jobType: "hourly_work",
      totalPay: 240,
      siteLocation: "Inspection Route 3",
    },
    {
      id: "canonical-hourly-work",
      payPeriodId: "active",
      workType: "hourly_work",
      totalPay: 300,
      siteLocation: "Service Area 4",
    },
  ],
  expenses: [],
  mileageEntries: [],
};

storage.set(STORAGE_KEYS.ACTIVE_PAY_PERIOD, JSON.stringify(mixedPayPeriod));

assert.deepEqual(loadActivePayPeriod().jobs, mixedPayPeriod.jobs);
assert.equal(saveActivePayPeriod(mixedPayPeriod), true);
assert.deepEqual(JSON.parse(storage.get(STORAGE_KEYS.ACTIVE_PAY_PERIOD)).jobs, mixedPayPeriod.jobs);

console.log("activePayPeriodStorage tests passed");
