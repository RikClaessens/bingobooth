import { createFileRoute } from '@tanstack/react-router';

const BingoCard = () => {
  const { cardId, playlistId } = Route.useParams();

  return (
    <div>
      BingoCard {playlistId} {cardId}
    </div>
  );
};

export const Route = createFileRoute('/cards/$playlistId/$cardId')({
  component: BingoCard,
});
