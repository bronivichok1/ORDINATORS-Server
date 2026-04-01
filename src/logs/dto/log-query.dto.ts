export class LogQueryDto {
    page?: number = 1;
    limit?: number = 50;
    userId?: number;
    actionType?: string;
    startDate?: string;
    endDate?: string;
    userRole?: string;
    search?: string;
  }