import { EvenType } from '../model/schema/events.schema';

export const eventList: EvenType[] = [
  {
    id: '1',
    title: 'Event 1',
    time: '2023-10-01T10:00:00Z',
    duration: 120,
    status: 'planned',
    location: [67.567236, 33.392166],
    description: 'Description for Event 1',
  },
  {
    id: '2',
    title: 'Event 2',
    time: '2023-10-02T12:00:00Z',
    duration: 90,
    status: 'ongoing',
    location: [67.565911, 33.415339],
    description: 'Description for Event 2',
  },
  {
    id: '3',
    title: 'Event 3',
    time: '2023-10-03T14:00:00Z',
    duration: 60,
    status: 'ended',
    location: [67.562895, 33.39079],
    description: 'Description for Event 3',
  },
  {
    id: '4',
    title: 'Event 4',
    time: '2023-10-04T16:00:00Z',
    duration: 30,
    status: 'cancelled',
    location: [67.557426, 33.41461],
    description: 'Description for Event 4',
  },
];
