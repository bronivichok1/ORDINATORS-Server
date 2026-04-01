export class CreateLogDto {
    userId?: number;
    userFio?: string;
    userRole?: string;
    actionType: string;
    description: string;
    targetInfo?: string;
    ipAddress?: string;
  }