import statusCode from '../constant/statusCode';

const SUCCESS = (res, data) => {
  res.status(statusCode.SUCCESS).json({ statusCode: statusCode.SUCCESS, message: 'Operation done successfully', data: data });
};

export default {
  SUCCESS
};