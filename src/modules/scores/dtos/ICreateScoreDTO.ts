export default interface ICreateScoreDTO {
  id: string;
  quantity: number;
  weight: string;
  start_date: Date;
  end_date: Date;
  type: string;
  nfe?: string;
  producer_id?: string;
  farm_id: string;
}
