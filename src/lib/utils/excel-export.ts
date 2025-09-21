/* eslint-disable @typescript-eslint/no-unused-vars */
import * as XLSX from "xlsx";
import type { SyncFilterResponse } from "@/lib/api/sync-filter.api";

export function exportSyncJobsToExcel(
  data: SyncFilterResponse,
  filename: string = "sync-jobs-export"
) {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet([]);

  const headers = [
    "S.No",
    "Job ID",
    "Employee Name",
    "Employee ID",
    "Order Code",
    "Amount",
    "Status",
    "Shift Name",
    "Phone",
    "Number of Photos",
    "Created At",
    "Updated At",
  ];

  XLSX.utils.sheet_add_aoa(worksheet, [["SYNC JOBS EXPORT REPORT"]], {
    origin: "A1",
  });
  XLSX.utils.sheet_add_aoa(
    worksheet,
    [[`Exported on: ${new Date().toLocaleString()}`]],
    { origin: "A2" }
  );
  XLSX.utils.sheet_add_aoa(worksheet, [[""]], { origin: "A4" });
  XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A5" });

  const jobsData = data.sync_jobs.map((job, index) => [
    index + 1,
    job.id,
    job.employeeName,
    job.employee_id || "N/A",
    job.orderprefixcode,
    parseFloat(String(job.pay_amount)),
    job.status,
    job.shift_name,
    job.orderphone,
    job.number_of_photos,
    new Date(job.created_at),
    new Date(job.updated_at),
  ]);

  XLSX.utils.sheet_add_aoa(worksheet, jobsData, { origin: "A6" });

  const summaryStartRow = 6 + jobsData.length + 1;
  XLSX.utils.sheet_add_aoa(worksheet, [[""]], {
    origin: `A${summaryStartRow}`,
  });

  const totalJobs = data.sync_jobs.length || 1;
  const summaryData = [
    ["SUMMARY REPORT", "", "", "", "", "", "", "", "", "", "", ""],
    [
      "Total Jobs:",
      data.sync_jobs.length,
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "Total Photos:",
      data.statistics.total_photos,
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "Total Money:",
      data.statistics.total_money,
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "Average per Job:",
      parseFloat((data.statistics.total_money / totalJobs).toFixed(2)),
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "Average Photos per Job:",
      Math.round(data.statistics.total_photos / totalJobs),
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
  ];

  XLSX.utils.sheet_add_aoa(worksheet, summaryData, {
    origin: `A${summaryStartRow + 1}`,
  });

  const columnWidths = [
    { wch: 8 },
    { wch: 10 },
    { wch: 25 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 12 },
    { wch: 18 },
    { wch: 18 },
    { wch: 18 },
    { wch: 22 },
    { wch: 22 },
  ];
  (worksheet as XLSX.WorkSheet)["!cols"] = columnWidths;

  const titleRange = XLSX.utils.decode_range("A1:L1");
  const dateRange = XLSX.utils.decode_range("A2:L2");
  const headerRange = XLSX.utils.decode_range(`A5:L5`);
  const dataRange = XLSX.utils.decode_range(`A6:L${5 + jobsData.length}`);
  const summaryRange = XLSX.utils.decode_range(
    `A${summaryStartRow + 1}:L${summaryStartRow + 6}`
  );

  const ws = worksheet as XLSX.WorkSheet & {
    [key: string]: unknown;
    "!merges"?: Array<{
      s: { r: number; c: number };
      e: { r: number; c: number };
    }>;
  };
  if (!ws["!merges"]) ws["!merges"] = [];
  ws["!merges"].push({ s: { r: 0, c: 0 }, e: { r: 0, c: 11 } });
  ws["!merges"].push({ s: { r: 1, c: 0 }, e: { r: 1, c: 11 } });

  const style: XLSX.CellStyle = {
    font: { bold: true, color: { rgb: "FFFFFF" } },
    fill: { fgColor: { rgb: "2E86AB" } },
    alignment: { horizontal: "center", vertical: "center" },
    border: {
      top: { style: "thin", color: { rgb: "000000" } },
      bottom: { style: "thin", color: { rgb: "000000" } },
      left: { style: "thin", color: { rgb: "000000" } },
      right: { style: "thin", color: { rgb: "000000" } },
    },
  } as XLSX.CellStyle;

  const headerStyle: XLSX.CellStyle = {
    font: { bold: true, color: { rgb: "FFFFFF" } },
    fill: { fgColor: { rgb: "4A90E2" } },
    alignment: { horizontal: "center", vertical: "center" },
    border: {
      top: { style: "thin", color: { rgb: "000000" } },
      bottom: { style: "thin", color: { rgb: "000000" } },
      left: { style: "thin", color: { rgb: "000000" } },
      right: { style: "thin", color: { rgb: "000000" } },
    },
  } as XLSX.CellStyle;

  const dataStyle: XLSX.CellStyle = {
    alignment: { horizontal: "center", vertical: "center" },
    border: {
      top: { style: "thin", color: { rgb: "CCCCCC" } },
      bottom: { style: "thin", color: { rgb: "CCCCCC" } },
      left: { style: "thin", color: { rgb: "CCCCCC" } },
      right: { style: "thin", color: { rgb: "CCCCCC" } },
    },
  } as XLSX.CellStyle;

  const summaryStyle: XLSX.CellStyle = {
    font: { bold: true },
    fill: { fgColor: { rgb: "F0F8FF" } },
    alignment: { horizontal: "left", vertical: "center" },
    border: {
      top: { style: "medium", color: { rgb: "000000" } },
      bottom: { style: "thin", color: { rgb: "000000" } },
      left: { style: "thin", color: { rgb: "000000" } },
      right: { style: "thin", color: { rgb: "000000" } },
    },
  } as XLSX.CellStyle;

  for (let col = titleRange.s.c; col <= titleRange.e.c; col++) {
    const cellRef = XLSX.utils.encode_cell({ r: 0, c: col });
    if (!(ws as Record<string, XLSX.CellObject>)[cellRef])
      (ws as Record<string, XLSX.CellObject>)[cellRef] = { v: "" };
    (ws as Record<string, XLSX.CellObject>)[cellRef].s = style;
  }

  for (let col = dateRange.s.c; col <= dateRange.e.c; col++) {
    const cellRef = XLSX.utils.encode_cell({ r: 1, c: col });
    if (!(ws as Record<string, XLSX.CellObject>)[cellRef])
      (ws as Record<string, XLSX.CellObject>)[cellRef] = { v: "" };
    (ws as Record<string, XLSX.CellObject>)[cellRef].s = {
      ...style,
      font: { ...(style.font as XLSX.Font), bold: false },
    } as XLSX.CellStyle;
  }

  for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
    const cellRef = XLSX.utils.encode_cell({ r: 4, c: col });
    if (!(ws as Record<string, XLSX.CellObject>)[cellRef])
      (ws as Record<string, XLSX.CellObject>)[cellRef] = { v: "" };
    (ws as Record<string, XLSX.CellObject>)[cellRef].s = headerStyle;
  }

  for (let row = dataRange.s.r; row <= dataRange.e.r; row++) {
    const isEvenRow = (row - dataRange.s.r) % 2 === 0;
    const rowStyle: XLSX.CellStyle = {
      ...(dataStyle as XLSX.CellStyle),
      fill: { fgColor: { rgb: isEvenRow ? "FFFFFF" : "F8F9FA" } },
    };

    for (let col = dataRange.s.c; col <= dataRange.e.c; col++) {
      const cellRef = XLSX.utils.encode_cell({ r: row, c: col });
      if (!(ws as Record<string, XLSX.CellObject>)[cellRef])
        (ws as Record<string, XLSX.CellObject>)[cellRef] = { v: "" };
      (ws as Record<string, XLSX.CellObject>)[cellRef].s = rowStyle;
    }
  }

  for (let row = summaryRange.s.r; row <= summaryRange.e.r; row++) {
    for (let col = summaryRange.s.c; col <= summaryRange.e.c; col++) {
      const cellRef = XLSX.utils.encode_cell({ r: row, c: col });
      if (!(ws as Record<string, XLSX.CellObject>)[cellRef])
        (ws as Record<string, XLSX.CellObject>)[cellRef] = { v: "" };
      (ws as Record<string, XLSX.CellObject>)[cellRef].s = summaryStyle;
    }
  }

  const amountCol = 5;
  for (let row = dataRange.s.r; row <= dataRange.e.r; row++) {
    const amountCell = XLSX.utils.encode_cell({ r: row, c: amountCol });
    if ((ws as Record<string, XLSX.CellObject>)[amountCell]) {
      (ws as Record<string, XLSX.CellObject>)[amountCell].z = "#,##0.00";
    }
  }

  const createdCol = 10;
  const updatedCol = 11;
  for (let row = dataRange.s.r; row <= dataRange.e.r; row++) {
    const createdCell = XLSX.utils.encode_cell({ r: row, c: createdCol });
    const updatedCell = XLSX.utils.encode_cell({ r: row, c: updatedCol });

    if ((ws as Record<string, XLSX.CellObject>)[createdCell]) {
      (ws as Record<string, XLSX.CellObject>)[createdCell].z =
        "mm/dd/yyyy hh:mm:ss AM/PM";
    }
    if ((ws as Record<string, XLSX.CellObject>)[updatedCell]) {
      (ws as Record<string, XLSX.CellObject>)[updatedCell].z =
        "mm/dd/yyyy hh:mm:ss AM/PM";
    }
  }

  XLSX.utils.book_append_sheet(workbook, worksheet, "Sync Jobs Report");

  const timestamp = new Date().toISOString().split("T")[0];
  const finalFilename = `${filename} - ${timestamp}.xlsx`;

  XLSX.writeFile(workbook, finalFilename);
}
