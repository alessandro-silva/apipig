export default interface ICreateScoreDTO {
  id: string;
  quantity: number;
  weight: string;
  start_date: Date;
  end_date: Date;
  type: string;
  nfe?: string;
  farm_id_sender?: string;
  farm_id_received?: string;
  farm_id_internal?: string;
  producer_id_sender?: string;
  producer_id_received?: string;
  producer_id_internal?: string;
}
