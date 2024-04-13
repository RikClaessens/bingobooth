import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Step, Stepper, StepperProps } from '@/components/ui/stepper';
import { Music, PersonStanding, Play } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { H1, H2, H3, Large, Muted } from '../ui/typograhy';

const steps = [
  {
    label: 'Bring your music',
    icon: Music,
    description:
      'Create a Spotify Playlist, make it public and paste the link below',
    id: 'bring-your-music',
  },
  // {
  //   label: 'Bring your friends',
  //   icon: PersonStanding,
  //   description: 'Choose how many friends you want to invite',
  //   id: 'bring-your-friends',
  // },
  {
    label: 'Bring your friends!',
    icon: Play,
    description:
      "All set! We'll create some Bingo cards for you and your friends!",
    id: 'bingo',
  },
] satisfies StepperProps['steps'];

const Steps = () => {
  type Playlist = {
    images: { url: string }[];
    tracks: { total: number };
    name: string;
  };

  const initialPlaylist = {
    images: [
      {
        url: 'https://mosaic.scdn.co/640/ab67616d00001e0213f982aa5c43146c3d2c1964ab67616d00001e02164edf20ddc765dff82d95cdab67616d00001e0251e2dc351aa486f9fa854870ab67616d00001e02a883e26f90ab617c91b90e56',
      },
      {
        url: 'https://mosaic.scdn.co/300/ab67616d00001e0213f982aa5c43146c3d2c1964ab67616d00001e02164edf20ddc765dff82d95cdab67616d00001e0251e2dc351aa486f9fa854870ab67616d00001e02a883e26f90ab617c91b90e56',
      },
      {
        url: 'https://mosaic.scdn.co/60/ab67616d00001e0213f982aa5c43146c3d2c1964ab67616d00001e02164edf20ddc765dff82d95cdab67616d00001e0251e2dc351aa486f9fa854870ab67616d00001e02a883e26f90ab617c91b90e56',
      },
    ],
    tracks: {
      total: 50,
    },
    name: 'Instrumental Mix',
  };

  const getPlaylist = async (playlistUrl: string) => {
    try {
      const result = await fetch(
        'https://75bu3dofpa.execute-api.eu-west-1.amazonaws.com/get-playlist',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ playlistUrl }),
        },
      );
      const playlistResult = (await result.json()) as { playlist: Playlist };
      setPlaylist(playlistResult.playlist);
    } catch (error) {
      console.error(error);
      setPlaylist(null);
    }
  };

  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  console.log({ playlist });

  const showStep = (id: string) => {
    switch (id) {
      case 'bring-your-music':
        return (
          <div>
            <Input
              type="text"
              placeholder="https://open.spotify.com/playlist/..."
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onChange={(e) => getPlaylist(e.target.value)}
            />

            <div
              className={`h-20 mt-2 transition-opacity duration-1000 ${playlist ? 'opacity-100' : 'opacity-0'}`}
            >
              {playlist ? (
                <div className="flex items-center">
                  <img
                    className="h-20 w-20 min-w-20"
                    src={playlist.images[0].url}
                  />
                  <H3 className="ml-4 w-full">{playlist.name}</H3>
                </div>
              ) : null}
            </div>
          </div>
        );
      case 'bring-your-friends':
        return <Input type="number" placeholder="25" />;
      case 'bingo':
        return (
          <Button color="primary" className="w-full">
            Start your Bingo!
          </Button>
        );
    }
  };

  return (
    <>
      <Card>
        <CardHeader />
        <CardContent>
          <H2>Bring your music!</H2>
          <Muted className="my-2">
            Create a Spotify Playlist, make it public and paste the link below
          </Muted>
          <div className="my-8">
            <Input
              type="text"
              placeholder="https://open.spotify.com/playlist/..."
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onChange={(e) => getPlaylist(e.target.value)}
            />

            <div
              className={`h-20 mt-8 transition-opacity duration-1000 ${playlist ? 'opacity-100' : 'opacity-0'}`}
            >
              {playlist ? (
                <div className="flex items-center">
                  <img
                    className="h-20 w-20 min-w-20"
                    src={playlist.images[0].url}
                  />
                  <H3 className="ml-4 w-full">{playlist.name}</H3>
                </div>
              ) : null}
            </div>
          </div>
          <Button color="primary" className="w-full mt-8">
            Start your Bingo!
          </Button>
        </CardContent>
      </Card>
      {/* <Stepper
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
      </Stepper> */}
      {/* <Button onClick={() => setPlaylist(playlist ? null : initialPlaylist)}>
        toggle
      </Button> */}
    </>
  );
};

export { Steps };
