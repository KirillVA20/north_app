import { Placemark, Polyline } from '@pbe/react-yandex-maps';
import { Map } from '@app/shared/ui/map';
import { useSelector } from 'react-redux';
import { selectGuideMode } from '@app/shared/store/slices/app-slice';
import { useGuideRoutes } from '../model/useGuideRoutes';
import { useGuidePoints } from '../model/useGuidePoints';
import { AdminPanel } from '@app/widgets/admin-panel/admin-panel';

export const GuideMap = () => {
  const guideMode = useSelector(selectGuideMode);

  const {
    routes,
    onMapClickHandler: onRoutesMapClick,
    coordinates: newRoutCoordinates,
    onPolyLineClick,
    routeCard,
    routeForm,
  } = useGuideRoutes();
  const {
    spots,
    newPointCoords,
    onMapClickHandler: onPointsMapClick,
    onPointClick,
    sportCard,
    spotForm,
  } = useGuidePoints();

  const onMapClick =
    guideMode === 'point' ? onPointsMapClick : onRoutesMapClick;

  return (
    <>
      <Map
        onMapClick={onMapClick}
        onPointClick={onPointClick}
        onPolylineClick={onPolyLineClick}
        pointItems={guideMode === 'point' ? spots : []}
        polylineItems={guideMode === 'route' ? routes : []}
      >
        <>
          {guideMode === 'point' && newPointCoords && (
            <Placemark
              geometry={newPointCoords}
              options={{
                preset: 'islands#icon',
                iconColor: '#0095b6',
              }}
            />
          )}
          {guideMode === 'route' && newRoutCoordinates && (
            <Polyline
              geometry={newRoutCoordinates}
              options={{
                strokeColor: '#3a7bd5',
                strokeWidth: 4,
              }}
            />
          )}
          {guideMode === 'route' &&
            newRoutCoordinates?.map((coord, index) => (
              <Placemark
                key={index}
                geometry={coord}
                options={{
                  preset: 'islands#blueCircleDotIcon',
                }}
              />
            ))}
        </>
      </Map>
      <div
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          backgroundColor: 'white',
          padding: '10px',
        }}
      >
        <AdminPanel />
        {guideMode === 'point' && (
          <>
            {sportCard}
            {spotForm}
          </>
        )}

        {guideMode === 'route' && (
          <>
            {routeCard}
            {routeForm}
          </>
        )}
      </div>
    </>
  );
};
