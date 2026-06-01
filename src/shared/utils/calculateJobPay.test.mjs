import assert from "node:assert/strict";
import { calculateJobPay } from "./calculateJobPay.js";

assert.equal(
  calculateJobPay({
    jobType: "hourly_work",
    hoursWorked: 7.5,
    hourlyRateSnapshot: 32,
  }),
  240
);

assert.equal(
  calculateJobPay({
    jobType: "bucking",
    hoursWorked: 6,
    hourlyRateSnapshot: 28,
  }),
  168
);

assert.equal(
  calculateJobPay({
    jobType: "torque_turn",
    baseJobPay: 750,
    additionalHours: 2,
    hourlyRateSnapshot: 28,
  }),
  806
);

assert.equal(
  calculateJobPay({
    jobType: "torque_turn",
    baseJobPay: 750,
    additionalHours: 0,
    hourlyRateSnapshot: 28,
  }),
  750
);

console.log("calculateJobPay tests passed");
