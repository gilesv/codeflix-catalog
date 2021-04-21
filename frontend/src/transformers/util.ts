export function toDate(date: any): Date|null {
  if (isNaN(Date.parse(date))) {
    return null;
  }
  return new Date(date);
}

export function toNumber(number: any): number|null {
  if (isNaN(number)) {
    return null;
  }
  return Number(number);
}

export function toArray(array: any): any[]|null {
  if (Array.isArray(array)) {
    return array;
  }
  return [];
}