import { APIGatewayProxyHandler } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Test 12345",
      FLAT_VALUE: process.env.FLAT_VALUE,
      METHOD: process.env.METHOD,
      EXTERNAL_API: process.env.EXTERNAL_API,
      OPT_EXISTING: process.env.OPT_EXISTING,
      OPT_DEFAULT: process.env.OPT_DEFAULT,
      CHECK: process.env.CHECK,
      CFN_CONDITION_TRUE: process.env.CFN_CONDITION_TRUE,
      CFN_CONDITION_FALSE: process.env.CFN_CONDITION_FALSE,
      BUCKET_FROM_THIS_TEMPLATE: process.env.BUCKET_FROM_THIS_TEMPLATE,
      DATA_FROM_ANOTHER_TEMPLATE: process.env.DATA_FROM_ANOTHER_TEMPLATE,
    }),
  };
};
