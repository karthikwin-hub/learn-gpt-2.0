/** Named places for city dots on the map of India: position, the region each lies in, and the dictionary key of its name. */

export interface Place {
  lat: number;
  lon: number;
  region: string;
  name: string;
}

export const PLACES = {
  delhi: { lat: 28.61, lon: 77.21, region: 'delhi', name: 'cities.c.delhi' },
  mumbai: { lat: 19.08, lon: 72.88, region: 'maharashtra', name: 'cities.c.mumbai' },
  kolkata: { lat: 22.57, lon: 88.36, region: 'wb', name: 'cities.c.kolkata' },
  chennai: { lat: 13.08, lon: 80.27, region: 'tn', name: 'states.cap.tn' },
  bengaluru: { lat: 12.97, lon: 77.59, region: 'karnataka', name: 'cities.c.bengaluru' },
  hyderabad: { lat: 17.39, lon: 78.49, region: 'telangana', name: 'states.cap.telangana' },
  shimla: { lat: 31.1, lon: 77.17, region: 'hp', name: 'states.cap.hp' },
  darjeeling: { lat: 27.04, lon: 88.26, region: 'wb', name: 'map.p.darjeeling' },
  gangotri: { lat: 30.99, lon: 78.94, region: 'uk', name: 'rivers.p.gangotri' },
  haridwar: { lat: 29.95, lon: 78.16, region: 'uk', name: 'rivers.p.haridwar' },
  prayagraj: { lat: 25.44, lon: 81.85, region: 'up', name: 'rivers.p.prayagraj' },
  varanasi: { lat: 25.32, lon: 82.97, region: 'up', name: 'rivers.p.varanasi' },
  patna: { lat: 25.59, lon: 85.14, region: 'bihar', name: 'rivers.p.patna' },
  jaisalmer: { lat: 26.92, lon: 70.91, region: 'rajasthan', name: 'map.p.jaisalmer' },
  bikaner: { lat: 28.02, lon: 73.31, region: 'rajasthan', name: 'map.p.bikaner' },
  mahabaleshwar: { lat: 17.92, lon: 73.66, region: 'maharashtra', name: 'map.p.mahabaleshwar' },
} as const satisfies Record<string, Place>;

export type PlaceId = keyof typeof PLACES;
