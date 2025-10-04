import { RSSI_AT_ONE_METER, PATH_LOSS_EXPONENT, ANCHORS } from 'src/constants';
import { rssiToDistance, trilaterate } from './trilateration';

// Главная функция: принимает RSSI от 3 якорей — возвращает позицию дрона
export function calculateDronPosition(
  rssiValues: [number, number, number],
): { x: number; y: number } | null {
  // Конвертация RSSI → расстояния
  const distances = rssiValues.map(rssi =>
    rssiToDistance(rssi, RSSI_AT_ONE_METER, PATH_LOSS_EXPONENT),
  ) as [number, number, number];

  // Решаем трилатерацию
  return trilaterate(ANCHORS, distances);
}