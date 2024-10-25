import { stringify } from "csv-stringify/sync";
import { ConstituentsRepository } from "./constituents.repository.js";
import { Constituent, Constituents } from "./types.js";

export class ConstituentsService {
  constructor(
    private readonly constituentsRepository: ConstituentsRepository,
  ) {}

  listConstituents(): Promise<Constituents> {
    return this.constituentsRepository.findConstituents();
  }

  async addConstituent(constituent: Constituent): Promise<void> {
    const existingConstituent =
      await this.constituentsRepository.findConstituent(constituent.email);

    if (existingConstituent) {
      return this.constituentsRepository.putConstituent(constituent);
    } else {
      return this.constituentsRepository.createConstituent(constituent);
    }
  }

  async makeConstituentsCSV(dateFilter: string): Promise<string> {
    const constituentsList =
      await this.constituentsRepository.findConstituents();
    const filterDate = dateFilter && new Date(dateFilter).getTime();

    const flatList = [];

    for (const [_key, value] of Object.entries(constituentsList)) {
      const createdDate = new Date(value.createdAt).getTime();

      if (filterDate && createdDate < filterDate) {
        continue;
      }

      const constituent = {
        ...value,
        createdAt: new Date(value.createdAt).toDateString(),
        lastUpdated: new Date(value.lastUpdated).toDateString(),
      };

      flatList.push(constituent);
    }

    return stringify(flatList, {
      header: true,
      columns: [
        "email",
        "firstName",
        "lastName",
        "addressLine1",
        "addressLine2",
        "city",
        "state",
        "zipCode",
        "createdAt",
        "lastUpdated",
      ],
    });
  }
}
