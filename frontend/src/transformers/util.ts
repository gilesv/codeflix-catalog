export function intoArrayOf<T>(
  transformer: (data: any) => T
): (arr: any) => T[] {
  return (arr: any) => {
    if (Array.isArray(arr)) {
      let result: T[] = [];
      for (let item of arr) {
        if (typeof item === "object") {
          result.push(transformer(item));
        }
      }
      return result;
    }
    return [];
  }
}

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