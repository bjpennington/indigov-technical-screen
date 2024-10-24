import { ConstituentsController } from "./constituents.controller";
import { ConstituentsRepository } from "./constituents.repository";
import { ConstituentsService } from "./constituents.service";

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
