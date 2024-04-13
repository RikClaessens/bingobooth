import type { APIGatewayProxyEventV2, APIGatewayProxyResult } from 'aws-lambda';
import { JSONSchemaType } from 'ajv';
import pino from 'pino';
import { createHandler } from './handler';

interface InputProps {
  body: { playlistUrl: string };
}

interface OutputProps {
  body: string;
  statusCode: number;
}

const eventSchema: JSONSchemaType<InputProps> = {
  type: 'object',
  required: ['body'],
  properties: {
    body: {
      type: 'object',
      required: ['playlistUrl'],
      properties: {
        playlistUrl: { type: 'string' },
      },
    },
  },
};

const validatePlaylistUrlHandler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResult> => {
  const { playlistUrl } = event.body as unknown as Record<string, string>;
  pino().info({ playlistUrl }, 'Validating playlist URL');
  return {
    statusCode: 200,
    body: JSON.stringify({ valid: true }, null, 2),
  };
};

export const handler = createHandler({
  handler: validatePlaylistUrlHandler,
  eventSchema,
});
