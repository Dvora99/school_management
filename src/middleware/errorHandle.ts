import errorType from '../utils/errorType';
import statusCode from '../constant/statusCode';
import { NextFunction, Response, Request } from 'express';

const errorResponse = (err: any, status: number, res: Response) => {
  const obj = { statusCode: status, message: err.message };
  res.status(status).json(obj);
};

const errorHandler = (err: any, req: Request, res: Response) => {
  switch(err.name) {
    case errorType.validation_error :
      return errorResponse(err.errors[0], statusCode.FORBIDDEN, res);

    case errorType.unauthorized :
      return errorResponse(err, statusCode.UNAUTHORIZED, res);

    case errorType.not_found :
      return errorResponse(err, statusCode.NOT_FOUND, res);

    case errorType.bad_request :
      return errorResponse(err, statusCode.BAD_REQUEST, res);

    case errorType.unique_constraint :
      return errorResponse(err.errors[0], statusCode.BAD_REQUEST, res);

    default :
      return errorResponse(err, statusCode.BAD_REQUEST, res);
  }
};

export default function (err: any, req: Request, res: Response, next: NextFunction) {
  return errorHandler(err, req, res);
  next(err);
}
