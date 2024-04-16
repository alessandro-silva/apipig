export default interface IFindAllFilters {
  type?: string;
  producer_id_sender?: string;
  created_at?: string;
  farm_id_sender?: string;
  producer_id_received?: string;
  farm_id_received?: string;
  producer_id_internal?: string;
  farm_id_internal?: string;
  take: number;
  page: number;
}
