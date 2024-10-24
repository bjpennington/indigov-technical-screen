import { ConstituentsRepository } from "./constituents.repository";

export class ConstituentsService {
  constructor(
    private readonly constituentsRepository: ConstituentsRepository,
  ) {}

  listConstituents(): string {
    return this.constituentsRepository.findConstituents();
  }

  addConstituent(): string {
    console.log(this.constituentsRepository.findConstituent());
    return this.constituentsRepository.createConstituent();
  }

  makeConstituentsCSV(): string {
    return this.constituentsRepository.findConstituents();
    return "csv list of constituents";
  }
}
