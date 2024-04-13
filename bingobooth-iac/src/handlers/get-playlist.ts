import type { APIGatewayProxyEventV2, APIGatewayProxyResult } from 'aws-lambda';
import { JSONSchemaType } from 'ajv';
import { getPlaylistFromUrl } from '../spotify';
import { createHandler } from './handler';

interface InputProps {
  body: { playlistUrl: string };
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

const mainHandler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResult> => {
  const { playlistUrl } = event.body as unknown as Record<string, string>;
  const playlist = await getPlaylistFromUrl(playlistUrl);
  return {
    statusCode: 200,
    body: JSON.stringify({ playlist }, null, 2),
  };
};

export const handler = createHandler({
  handler: mainHandler,
  eventSchema,
});
