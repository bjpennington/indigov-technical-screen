import { RequestListener } from "http";
import { DEFAULT_HEADERS, Router } from "../../handler";
import { ConstituentsService } from "./constituents.service";

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

  postConstituent: RequestListener = (_request, response) => {
    const constituentSuccessMessage = this.constituentsService.addConstituent();
    response.writeHead(201, DEFAULT_HEADERS);

    response.end(JSON.stringify(constituentSuccessMessage));
  };

  downloadConstituent: RequestListener = (_request, response) => {
    const constituentsCSV = this.constituentsService.makeConstituentsCSV();
    response.writeHead(200, DEFAULT_HEADERS);

    response.end(JSON.stringify(constituentsCSV));
  };
}
