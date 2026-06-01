import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync("src/features/exports/TimesheetPrintView.jsx", "utf8");

assert.match(source, /Date/);
assert.match(source, /Client \/ Company/);
assert.match(source, /Site \/ Location/);
assert.match(source, /Reference Number/);
assert.match(source, /Base Pay/);
assert.match(source, /Hours Worked/);
assert.match(source, /Travel Reimbursement/);
assert.match(source, /Total/);

assert.match(source, /Mileage Details/);
assert.match(source, /mileageEntries/);
assert.match(source, /calculateMileageSummary/);
assert.match(source, /Total Business Miles/);
assert.match(source, /Estimated Mileage Value/);
assert.match(source, /businessPurpose/);
assert.match(source, /mileageRateSnapshot/);

console.log("timesheetPrintView tests passed");
