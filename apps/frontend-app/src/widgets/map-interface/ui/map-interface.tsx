import Segmented from '@app/shared/ui/segmented/segmented';
import styles from './map-interface.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectMode, setMode } from '@app/shared/store/slices/app-slice';
import { PreviewList } from './preview-list/preview-list';
import { eventList } from '@app/enteties/events/mock/data';

const list = [
  { value: 'events', label: 'События' },
  { value: 'places', label: 'Места' },
  { value: 'history', label: 'История' },
];

const mockItems = {
  events: eventList,
  places: [],
  history: [],
};

export const MapInterface = () => {
  const mode = useSelector(selectMode);
  const dispatch = useDispatch();

  return (
    <div className={styles.root}>
      <Segmented
        options={list}
        defaultValue={mode}
        onChange={(value) => {
          dispatch(setMode(value)); // string
        }}
      />
      <PreviewList items={mockItems[mode]} />
    </div>
  );
};
