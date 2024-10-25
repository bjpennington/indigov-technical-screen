import { readFile, writeFile } from "fs/promises";
import { Constituent, Constituents } from "./types.js";

export class ConstituentsRepository {
  constructor(private readonly databasePath: string) {}

  async currentDatabaseContent(): Promise<{
    constituents: Constituents;
  }> {
    const contentsBuffer = await readFile(this.databasePath);
    return JSON.parse(contentsBuffer.toString());
  }

  async findConstituent(email: string) {
    const constituentsData = await this.currentDatabaseContent();
    const constituent = constituentsData.constituents[email];

    return constituent;
  }

  async findConstituents() {
    const constituentsData = await this.currentDatabaseContent();
    return constituentsData.constituents;
  }

  async createConstituent(constituent: Constituent) {
    const constituentsData = await this.currentDatabaseContent();

    const currentDate = new Date();

    constituentsData.constituents = {
      ...constituentsData.constituents,
      [constituent.email]: {
        ...constituent,
        createdAt: currentDate,
        lastUpdated: currentDate,
      },
    };

    return writeFile(this.databasePath, JSON.stringify(constituentsData));
  }

  async putConstituent(constituent: Constituent) {
    const constituentsData = await this.currentDatabaseContent();

    const originalConstituent =
      constituentsData.constituents[constituent.email];
    const currentDate = new Date();

    constituentsData.constituents = {
      ...constituentsData.constituents,
      [constituent.email]: {
        ...originalConstituent,
        ...constituent,
        lastUpdated: currentDate,
      },
    };

    return writeFile(this.databasePath, JSON.stringify(constituentsData));
  }
}
