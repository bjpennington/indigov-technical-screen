import { RequestListener } from "http";
import { once } from "events";
import { DEFAULT_HEADERS, Router } from "../../handler";
import { ConstituentsService } from "./constituents.service";
import { Constituent } from "./types";

export class ConstituentsController {
  readonly routes: Router;

  constructor(private readonly constituentsService: ConstituentsService) {
    this.routes = {
      "get:/constituents": this.getConstituents,
      "post:/constituents": this.postConstituent,
      "get:/constituents/download": this.downloadConstituent,
    };
  }

  getConstituents: RequestListener = async (_request, response) => {
    const constituentsList = await this.constituentsService.listConstituents();
    response.writeHead(200, DEFAULT_HEADERS);

    response.end(JSON.stringify(constituentsList));
  };

  postConstituent: RequestListener = async (request, response) => {
    const dataBuffer = await once(request, "data");
    const data = JSON.parse(dataBuffer.toString());

    const constituentSuccessMessage =
      await this.constituentsService.addConstituent(
        data as unknown as Constituent,
      );
    response.writeHead(201, DEFAULT_HEADERS);

    response.end(JSON.stringify(constituentSuccessMessage));
  };

  downloadConstituent: RequestListener = async (_request, response) => {
    const constituentsCSV =
      await this.constituentsService.makeConstituentsCSV();

    const currentTime = new Date();
    const dateString = currentTime.toISOString();

    response.writeHead(200, {
      ...DEFAULT_HEADERS,
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename=constituents-contact-export-${dateString}.csv`,
    });

    response.end(constituentsCSV);
  };
}
