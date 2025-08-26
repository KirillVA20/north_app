import React from 'react';
import { EvenType } from '@app/enteties/events/model/schema/events.schema';
import styles from './event-card.module.css';
import Text from '@app/shared/ui/text';
import Title from '@app/shared/ui/title';

interface EventCardProps {
  event: EvenType;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className={styles.card}>
      <Text size={20}>{event.title}</Text>
      <Text>Time: {event.time}</Text>
      <Text>Duration: {event.duration} minutes</Text>
      <Text>Status: {event.status}</Text>
    </div>
  );
};

export default EventCard;
