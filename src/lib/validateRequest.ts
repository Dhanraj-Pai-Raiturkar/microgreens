import { Request, Response } from 'express';

const validateRequest = (
  req: Request,
  res: Response,
  requestField: 'body' | 'query' | 'params',
  requriedFields: string[]
) => {
  const missingFields = requriedFields.filter(
    (reqField) => !Object.keys(req[requestField]).includes(reqField)
  );
  if (missingFields?.length) {
    res.status(400).json({
      status: false,
      error: `missing the following required ${requestField} field(s): ${missingFields?.join(
        ', '
      )}`
    });
    return false;
  }
  return true;
};

export default validateRequest;
