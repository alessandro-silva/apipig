export default interface IScoreResponseDTO {
  quantity: number;
  weight: string;
  start_date: Date;
  end_date: Date;
  file_url(): string;
}
