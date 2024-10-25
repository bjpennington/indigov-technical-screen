import { RequestListener } from "http";
import { once } from "events";
import querystring from "querystring";
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

    if (!data.email) {
      response.writeHead(400, DEFAULT_HEADERS);
      response.end(JSON.stringify({ error: "email field must be provided" }));
      return;
    }

    await this.constituentsService.addConstituent(
      data as unknown as Constituent,
    );

    response.writeHead(201, DEFAULT_HEADERS);
    response.end(JSON.stringify("Success"));
  };

  downloadConstituent: RequestListener = async (request, response) => {
    const { url } = request;
    const queryString = url?.split("?")[1];
    const queryParams = querystring.parse(queryString ?? "");
    const dateFilter = queryParams["after"] as unknown as string;

    const constituentsCSV =
      await this.constituentsService.makeConstituentsCSV(dateFilter);

    const currentDate = new Date();
    const dateString = currentDate.toISOString();

    response.writeHead(200, {
      ...DEFAULT_HEADERS,
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename=constituents-contact-export-${dateString}.csv`,
    });
    response.end(constituentsCSV);
  };
}
