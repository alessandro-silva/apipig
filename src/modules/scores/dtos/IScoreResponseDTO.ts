export default interface IScoreResponseDTO {
  quantity: number;
  weight: string;
  start_date: Date;
  end_date: Date;
  status: boolean;
  file_url?: string;
  type: string;
  nfe: string;
  name?: string;
  lote?: string;
  progress?: string;
  female?: string;
  male?: string;
  farm_id_sender?: string;
  farm_id_received?: string;
  farm_id_internal?: string;
  producer_id_sender?: string;
  producer_id_received?: string;
  producer_id_internal?: string;
}
