declare type PaymentsDashboardMonthlyPayment = {
  month: string;
  value: number | string;
};

declare type PaymentsDashboardDistribution = {
  send_print: number;
  other: number;
};

declare type PaymentsDashboardStaff = {
  id: number;
  name: string;
  role: string;
  phone: string;
  status: string;
};

declare type PaymentsDashboardPhotoStats = {
  print: number;
  send: number;
  print_and_send: number;
  total: number;
  distribution: {
    print: number;
    send: number;
    print_and_send: number;
  };
};

declare type PaymentsDashboardSelectedPhotoStats = {
  sold: number;
  total: number;
  distribution: {
    sold: number;
  };
};

declare type PaymentsDashboardData = {
  branch: string;
  monthly_payments: PaymentsDashboardMonthlyPayment[];
  distribution: PaymentsDashboardDistribution;
  staff: PaymentsDashboardStaff[];
  photo_stats: PaymentsDashboardPhotoStats;
  selected_photo_stats: PaymentsDashboardSelectedPhotoStats;
  date: string;
};
