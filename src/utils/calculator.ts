import { ResultFlag, TestParameter } from '../types/lab';

/**
 * Calculates flag based on numerical or qualitative results
 */
export function calculateFlag(
  resultStr: string,
  minNormal?: number,
  maxNormal?: number,
  panicLow?: number,
  panicHigh?: number
): ResultFlag {
  if (!resultStr || resultStr.trim() === '') return '';

  const num = parseFloat(resultStr);
  if (isNaN(num)) {
    const lower = resultStr.toLowerCase().trim();
    if (lower.includes('positive') || lower.includes('reactive') || lower.includes('detected') || lower.includes('abnormal')) {
      return 'ABNORMAL';
    }
    return 'NORMAL';
  }

  // Panic / Critical checks
  if (panicLow !== undefined && num <= panicLow) {
    return 'PANIC_LOW';
  }
  if (panicHigh !== undefined && num >= panicHigh) {
    return 'PANIC_HIGH';
  }

  // Normal checks
  if (minNormal !== undefined && num < minNormal) {
    return 'LOW';
  }
  if (maxNormal !== undefined && num > maxNormal) {
    return 'HIGH';
  }

  return 'NORMAL';
}

/**
 * Calculates pointer position (0% - 100%) on a visual chart where:
 * 0% - 25% is Low Zone
 * 25% - 75% is Normal Zone
 * 75% - 100% is High Zone
 */
export function getChartPointerPosition(
  resultStr: string,
  minNormal?: number,
  maxNormal?: number
): { positionPercent: number; zone: 'low' | 'normal' | 'high' | 'unknown' } {
  const num = parseFloat(resultStr);
  if (isNaN(num) || minNormal === undefined || maxNormal === undefined || maxNormal <= minNormal) {
    return { positionPercent: 50, zone: 'unknown' };
  }

  const normalSpan = maxNormal - minNormal;

  if (num < minNormal) {
    // Falls in low region (0 to 25%)
    const diff = minNormal - num;
    const maxLowRange = normalSpan * 0.8;
    const ratio = Math.min(1, Math.max(0, diff / maxLowRange));
    const pos = 25 - ratio * 20; // between 5% and 25%
    return { positionPercent: Math.max(4, Math.round(pos)), zone: 'low' };
  }

  if (num > maxNormal) {
    // Falls in high region (75 to 100%)
    const diff = num - maxNormal;
    const maxHighRange = normalSpan * 0.8;
    const ratio = Math.min(1, Math.max(0, diff / maxHighRange));
    const pos = 75 + ratio * 20; // between 75% and 95%
    return { positionPercent: Math.min(96, Math.round(pos)), zone: 'high' };
  }

  // Falls in normal region (25 to 75%)
  const ratio = (num - minNormal) / normalSpan;
  const pos = 25 + ratio * 50;
  return { positionPercent: Math.round(pos), zone: 'normal' };
}

/**
 * Formats reference interval for display in column 5
 */
export function formatReferenceDisplay(param: TestParameter): string {
  if (param.textReference && param.textReference.trim().length > 0) {
    return param.textReference;
  }

  if (param.minNormal !== undefined && param.maxNormal !== undefined) {
    return `${param.minNormal} - ${param.maxNormal} ${param.unit}`.trim();
  }

  if (param.maxNormal !== undefined) {
    return `< ${param.maxNormal} ${param.unit}`.trim();
  }

  if (param.minNormal !== undefined) {
    return `> ${param.minNormal} ${param.unit}`.trim();
  }

  return param.unit ? `Unit: ${param.unit}` : '—';
}
