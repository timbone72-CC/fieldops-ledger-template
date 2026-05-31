export function buildPayPeriodCsv(payPeriod) {
  const rows = [
    ["Demo Field Services LLC"],
    ["100 Demo Operations Way, Suite 200, Sample City, ST 00000"],
    ["Please remit demo invoices to: accounting@example.com"],
    [],
    ["Pay Period:", payPeriod?.label || ""],
    ["Start Date:", payPeriod?.startDate || ""],
    ["End Date:", payPeriod?.endDate || ""],
    [],
    ["Name:", "Demo Field Worker"],
    ["Address:", "123 Sample Worker Road"],
    ["City, State, Zip:", "Sample City, ST 00000"],
    ["Phone:", "555-0100"],
    ["Email Address:", "field.worker@example.com"],
    [],
    [
      "Date",
      "Company",
      "Rig Name/Number",
      "Field Ticket Number",
      "Day Rate",
      "Hours Worked",
      "Transportation",
      "Total",
    ],
  ];

  const jobs = Array.isArray(payPeriod?.jobs) ? payPeriod.jobs : [];

  jobs.forEach((job) => {
    rows.push([
      job.date || "",
      job.company || "",
      job.rigNameOrNumber || "",
      job.fieldTicketNumber || "",
      job.baseJobPay ?? "",
      getHoursWorkedForTimesheet(job),
      job.transportation ?? "",
      job.totalPay ?? 0,
    ]);
  });

  rows.push([]);
  rows.push(["Grand Total", "", "", "", "", "", "", calculateGrandTotal(jobs)]);

  return rows.map((row) => row.map(formatCsvCell).join(",")).join("\n");
}

export function getHoursWorkedForTimesheet(job) {
  if (job?.jobType === "torque_turn") {
    return job.additionalHours ?? 0;
  }

  return job?.hoursWorked ?? 0;
}

export function calculateGrandTotal(jobs) {
  return jobs.reduce((total, job) => total + Number(job.totalPay ?? 0), 0);
}

export function formatCsvCell(value) {
  const text = String(value ?? "");

  if (text.includes(",") || text.includes('"') || text.includes("\n")) {
    return `"${text.replaceAll('"', '""')}"`;
  }

  return text;
}
