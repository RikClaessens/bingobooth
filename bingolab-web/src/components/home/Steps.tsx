import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Step, Stepper, StepperProps } from '@/components/ui/stepper';
import { Music, PersonStanding, Play } from 'lucide-react';

const steps = [
  {
    label: 'Bring your music',
    icon: Music,
    description:
      'Create a Spotify Playlist, make it public and paste the link below',
    id: 'bring-your-music',
  },
  {
    label: 'Bring your friends',
    icon: PersonStanding,
    description: 'Choose how many friends you want to invite',
    id: 'bring-your-friends',
  },
  {
    label: 'Bingo!',
    icon: Play,
    description:
      "All set! We'll create some Bingo cards for you and your friends!",
    id: 'bingo',
  },
] satisfies StepperProps['steps'];

const showStep = (id: string) => {
  switch (id) {
    case 'bring-your-music':
      return (
        <Input
          type="text"
          placeholder="https://open.spotify.com/playlist/..."
        />
      );
    case 'bring-your-friends':
      return <Input type="number" placeholder="25" />;
    case 'bingo':
      return (
        <Button color="primary" className="w-full">
          Ready to play!
        </Button>
      );
  }
};

const Steps = () => {
  return (
    <Stepper
      initialStep={-1}
      steps={steps}
      orientation="vertical"
      expandVerticalSteps
    >
      {steps.map((stepProps) => {
        return (
          <Step key={stepProps.label} {...stepProps} className="w-full">
            <div className="flex justify-center py-8">
              <div className='className="my-8 w-3/4'>
                {showStep(stepProps.id || '')}
              </div>
            </div>
          </Step>
        );
      })}
    </Stepper>
  );
};

export { Steps };
