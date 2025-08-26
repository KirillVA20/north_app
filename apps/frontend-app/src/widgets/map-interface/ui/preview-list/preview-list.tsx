import { EventCard } from '@app/enteties/events';
import { EvenType } from '@app/enteties/events/model/schema/events.schema';
import styles from './preview-list.module.css';

type PreviewListProps = {
  items: EvenType[];
};

export const PreviewList = (props: PreviewListProps) => {
  const { items } = props;

  return (
    <div className={`blur-background ${styles.root}`}>
      {items.map((item) => (
        <EventCard key={item.id} event={item} />
      ))}
    </div>
  );
};
