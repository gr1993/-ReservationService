export interface SearchTicketType {
  pageNumber?: number;
  memberCount: number;
  airline?: string;
  startAirport?: string;
  endAirport?: string;
  startDate: Date;
}

export interface ReserveTicketType {
  ticketSrls: number[];
  count: number;
}
