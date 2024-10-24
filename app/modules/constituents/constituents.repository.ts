import { readFile } from "fs/promises";
import { Constituents } from "./types";

export class ConstituentsRepository {
  constructor(private readonly databasePath: string) {}

  async currentDatabaseContent(): Promise<{
    constituents: Constituents;
  }> {
    const contentsBuffer = await readFile(this.databasePath);
    return JSON.parse(contentsBuffer.toString());
  }

  async findConstituent() {
    return "here is a constituent";
  }

  async findConstituents() {
    const constituentsData = await this.currentDatabaseContent();
    return constituentsData.constituents;
  }

  createConstituent() {
    return "you made a constituent";
  }
}
