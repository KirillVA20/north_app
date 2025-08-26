import React from 'react';
import {
  selectMode,
  selectActionMode,
  setMode,
  setActionMode,
  selectGuideMode,
  setGuideMode,
} from '@app/shared/store/slices/app-slice';
import { Button } from '@app/shared/ui/Button';
import { useDispatch, useSelector } from 'react-redux';

export const AdminPanel = () => {
  const dispatch = useDispatch();
  const mode = useSelector(selectMode);
  const actionMode = useSelector(selectActionMode);
  const guideMode = useSelector(selectGuideMode);

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <Button
          viewType={mode === 'guide' ? 'primary' : 'outline'}
          onClick={() => dispatch(setMode('guide'))}
        >
          Гид
        </Button>
        <Button
          viewType={mode === 'events' ? 'primary' : 'outline'}
          onClick={() => dispatch(setMode('events'))}
        >
          События
        </Button>
      </div>
      {mode === 'guide' && (
        <div style={{ display: 'flex', gap: 8 }}>
          <Button
            viewType={guideMode === 'point' ? 'primary' : 'outline'}
            onClick={() => dispatch(setGuideMode('point'))}
          >
            Точки
          </Button>
          <Button
            viewType={guideMode === 'route' ? 'primary' : 'outline'}
            onClick={() => dispatch(setGuideMode('route'))}
          >
            Пути
          </Button>
        </div>
      )}

      <div style={{ display: 'flex', gap: 8 }}>
        <Button
          viewType={actionMode === 'show' ? 'primary' : 'outline'}
          onClick={() => dispatch(setActionMode('show'))}
        >
          Просмотр
        </Button>
        <Button
          viewType={actionMode === 'edit' ? 'primary' : 'outline'}
          onClick={() => dispatch(setActionMode('edit'))}
        >
          Редактирование
        </Button>
      </div>
    </div>
  );
};
