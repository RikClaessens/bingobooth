import type { APIGatewayProxyEventV2, APIGatewayProxyResult } from 'aws-lambda';
import { JSONSchemaType } from 'ajv';
import { getPlaylistTracksFromId } from '../spotify';
import { createHandler } from './handler';

interface InputProps {
  body: { playlistId: string };
}

const eventSchema: JSONSchemaType<InputProps> = {
  type: 'object',
  required: ['body'],
  properties: {
    body: {
      type: 'object',
      required: ['playlistId'],
      properties: {
        playlistId: { type: 'string' },
      },
    },
  },
};

const mainHandler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResult> => {
  const {
    body: { playlistId },
  } = event as unknown as InputProps;
  const tracks = await getPlaylistTracksFromId(playlistId);
  return {
    statusCode: 200,
    body: JSON.stringify({ tracks }, null, 2),
  };
};

export const handler = createHandler({
  handler: mainHandler,
  eventSchema,
});
