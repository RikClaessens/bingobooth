import type { APIGatewayProxyEventV2, APIGatewayProxyResult } from 'aws-lambda';
import middy from '@middy/core';
import errorLogger from '@middy/error-logger';
import httpErrorHandler from '@middy/http-error-handler';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpHeaderNormalizer from '@middy/http-header-normalizer';
import jsonBodyParser from '@middy/http-json-body-parser';
import inputOutputLogger from '@middy/input-output-logger';
import validator from '@middy/validator';
import { transpileSchema } from '@middy/validator/transpile';

export const createHandler = ({
  handler,
  eventSchema,
  responseSchema,
}: {
  handler: (input: any) => Promise<APIGatewayProxyResult>;
  eventSchema?: object;
  responseSchema?: object;
}) => {
  return (
    middy(handler)
      // .use(errorLogger())
      // .use(inputOutputLogger())
      // .use(httpHeaderNormalizer())
      // .use(httpEventNormalizer())
      .use(jsonBodyParser())
      .use(
        validator({
          eventSchema: eventSchema && transpileSchema(eventSchema),
          // responseSchema: responseSchema && transpileSchema(responseSchema),
        }),
      )
      .use(httpErrorHandler())
  );
};
