export interface Point {
  coordinates: [number, number]; // [lng, lat]
  photo?: string;
  description?: string;
}

export interface Route {
  _id: string;
  name: string;
  description?: string;
  points: Point[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateRouteDto {
  name: string;
  description?: string;
  points: Point[];
}

export interface SpotMedia {
  url: string;
  type: 'photo' | 'video';
}

export interface Spot {
  _id: string;
  name: string;
  description?: string;
  location: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
  userId: string;
  media?: SpotMedia[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateSpotDto {
  name: string;
  description?: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  userId?: string;
}

export interface UpdateSpotDto {
  name?: string;
  description?: string;
  location?: {
    type: 'Point';
    coordinates: [number, number];
  };
}
