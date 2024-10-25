import { ConstituentsController } from "./constituents.controller.js";
import { ConstituentsRepository } from "./constituents.repository.js";
import { ConstituentsService } from "./constituents.service.js";

export const generateConstituentsModule = ({
  databasePath,
}: {
  databasePath: string;
}) => {
  const constituentsRepository = new ConstituentsRepository(databasePath);
  const constituentsService = new ConstituentsService(constituentsRepository);
  const constituentsController = new ConstituentsController(
    constituentsService,
  );

  return constituentsController.routes;
};
