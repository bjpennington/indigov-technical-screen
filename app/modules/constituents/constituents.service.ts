import { ConstituentsRepository } from "./constituents.repository";
import { Constituents } from "./types";

export class ConstituentsService {
  constructor(
    private readonly constituentsRepository: ConstituentsRepository,
  ) {}

  listConstituents(): Promise<Constituents> {
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
