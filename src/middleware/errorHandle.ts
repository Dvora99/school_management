import errorType from '../utils/errorType';
import statusCode from '../constant/statusCode';

const errorResponse = (err, status ,res) => {
  const obj = { statusCode: status, message: err.message };
  res.status(status).json(obj);
};

const errorHandler = (err, req, res) => {
  switch(err.name) {
    case errorType.validation_error :
      return errorResponse(err.errors[0], statusCode.FORBIDDEN, res);

    case errorType.unauthorized :
      return errorResponse(err, statusCode.UNAUTHORIZED, res);

    case errorType.not_found :
      return errorResponse(err, statusCode.NOT_FOUND, res);

    case errorType.bad_request :
      return errorResponse(err, statusCode.BAD_REQUEST, res);

    default :
      return errorResponse(err, statusCode.BAD_REQUEST, res);
  }
};

export default function (err, req, res, next) {
  return errorHandler(err, req, res);
}
