// Summary section
declare type Summary = {
  total_sales: string;
  total_clients: number;
  printed_photos: number;
  active_booths: number;
};

// Sales chart section
declare type SalesChart = {
  labels: string[];
  data: number[];
};

// Staff performance entry
declare type StaffPerformanceEntry = {
  name: string;
  customers: number;
  photos: number;
};

// Photo stats section
declare type PhotoStats = {
  sold_percentage: number;
  sold_count: number;
  captured_count: number;
};
declare type homeStates = {
  summary: Summary;
  sales_chart: SalesChart;
  staff_performance: StaffPerformanceEntry[];
  photo_stats: PhotoStats;
};
