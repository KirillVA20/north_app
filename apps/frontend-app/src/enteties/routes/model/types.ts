import { z } from 'zod';
import {
  RouteSchema,
  CreateRouteSchema,
  UpdateRouteSchema,
  GeoJSONLineStringSchema,
} from './schema';

// Основной тип маршрута
export type Route = z.infer<typeof RouteSchema>;

// Типы для DTO
export type CreateRouteDto = z.infer<typeof CreateRouteSchema>;
export type UpdateRouteDto = z.infer<typeof UpdateRouteSchema>;

// Дополнительные типы (если нужны)
export type GeoJSONLineString = z.infer<typeof GeoJSONLineStringSchema>;
