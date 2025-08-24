// Sync job entry
declare type SyncJob = {
  id: number;
  branch_id: number;
  employeeName: string;
  pay_amount: number;
  orderprefixcode: string;
  status: "completed" | "failed" | "pending" | "synced";
  shift_name: string;
  orderphone: string;
  number_of_photos: number;
  created_at: string;
  updated_at: string;
};

// Status breakdown
declare type StatusBreakdown = {
  completed: number;
  failed: number;
  pending: number;
  synced: number;
};

// New sync jobs statistics
declare type SyncJobsStats = {
  total_jobs: number;
  total_pay_amount: string;
  total_photos: number;
  status_breakdown: StatusBreakdown;
  jobs: SyncJob[];
};

// Legacy types for backward compatibility (can be removed later)
declare type Summary = {
  total_sales: string;
  total_clients: number;
  printed_photos: number;
  active_booths: number;
  clients?: number;
};

declare type SalesChart = {
  labels: string[];
  data: number[];
};

declare type StaffPerformanceEntry = {
  name: string;
  customers: number;
  photos: number;
};

declare type PhotoStats = {
  sold_percentage: number;
  sold_count: number;
  captured_count: number;
};

// Updated home states to use new sync jobs data
declare type homeStates = SyncJobsStats;

declare type paymentStates = {
  total_sales: string;
  total_clients: number;
  printed_photos: number;
  clients?: number;
  active_booths: number;
  sales_data: SalesChart;
  staff_performance: StaffPerformanceEntry[];
  photo_distribution: PhotoStats;
  employees: Employee[];
};
