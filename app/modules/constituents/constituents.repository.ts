export class ConstituentsRepository {
  constructor(private readonly db: string) {}

  findConstituent() {
    return "here is a constituent";
  }

  findConstituents() {
    return "list of constituents";
  }

  createConstituent() {
    return "you made a constituent";
  }
}
