export interface OrderStatus {
  id?: number;
  allocationStatus: string;
  dispatchStatus: string;
  scheduleStatus: string;
  scheduledDate: Date;
  dispatchedDate: Date;
  receivedDate: Date;
}
