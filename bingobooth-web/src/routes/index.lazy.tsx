import { createLazyFileRoute } from '@tanstack/react-router';
import { Steps } from '@/components/home';
import { H1 } from '@/components/ui/typograhy';
import BingoboothLogo from '@/assets/bingobooth.svg';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="w-full h-screen">
      <div className="w-full flex items-center pt-12 flex-col">
        <div className="w-3/4 max-w-[600px]">
          <img src={BingoboothLogo} />
        </div>
        <div className="px-2 text-center mt-8">
          <H1>Your music, your friends, your Bingo!</H1>
        </div>
        <div className="mt-32 w-11/12 max-w-[600px]">
          <Steps />
        </div>
      </div>
    </div>
  );
}
