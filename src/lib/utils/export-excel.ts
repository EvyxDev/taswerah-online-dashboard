/* eslint-disable @typescript-eslint/no-explicit-any */
// First, install the required package:
// npm install xlsx

import * as XLSX from "xlsx";

export function exportSyncJobsToExcel(syncFilterData: any) {
  if (!syncFilterData?.sync_jobs || syncFilterData.sync_jobs.length === 0) {
    alert("No data to export");
    return;
  }

  // Prepare the data for Excel
  const excelData = syncFilterData.sync_jobs.map((job: any) => ({
    "Employee Name": job.employeeName,
    "Employee ID": job.employee_id || "N/A",
    "Branch ID": job.branch_id || "N/A",
    "Order Code": job.orderprefixcode,
    Status: job.status,
    "Pay Amount": job.pay_amount,
    "Number of Photos": job.number_of_photos,
    "Order Phone": job.orderphone,
    "Shift Name": job.shift_name || "N/A",
    "Created At": new Date(job.created_at).toLocaleString(),
    "Updated At": new Date(job.updated_at).toLocaleString(),
  }));

  // Create summary data
  const summaryData = [
    { Field: "Total Jobs", Value: syncFilterData.sync_jobs.length },
    { Field: "Total Photos", Value: syncFilterData.statistics.total_photos },
    {
      Field: "Total Money",
      Value: `$${syncFilterData.statistics.total_money}`,
    },
  ];

  // Create workbook and worksheets
  const workbook = XLSX.utils.book_new();

  // Add main data sheet
  const mainSheet = XLSX.utils.json_to_sheet(excelData);
  XLSX.utils.book_append_sheet(workbook, mainSheet, "Sync Jobs");

  // Add summary sheet
  const summarySheet = XLSX.utils.json_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");

  // Add employee photos summary if available
  // Check both direct access and nested in data object
  const employeePhotosSummary = syncFilterData.employee_photos_summary;
  console.log("Employee photos summary:", syncFilterData);
  console.log("Employee photos summary:", employeePhotosSummary);
  if (employeePhotosSummary && employeePhotosSummary.length > 0) {
    const employeePhotoData = employeePhotosSummary.map((emp: any) => ({
      "Employee Name": emp.employeeName,
      "Employee ID": emp.employee_id || "N/A",
      "Branch ID": emp.branch_id || "N/A",
      "Total Photos": emp.total_photos,
    }));

    const employeeSheet = XLSX.utils.json_to_sheet(employeePhotoData);
    XLSX.utils.book_append_sheet(
      workbook,
      employeeSheet,
      "Employee Photos Summary"
    );
  }

  // Generate filename with current date
  const now = new Date();
  const filename = `sync_jobs_export_${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}.xlsx`;

  // Write and download the file
  XLSX.writeFile(workbook, filename);
}
