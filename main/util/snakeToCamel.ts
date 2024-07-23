/**
 * Convert snake_case to camelCase
 * @param str string
 * @returns string
 */
export const snakeToCamel = (str: string) => {
  return str.replace(/([-_]\w)/g, (g) => g[1].toUpperCase());
};

/**
 * Convert key of object snake_case to camelCase
 * @param obj object
 * @returns object
 */
export const convertKeysToCamelCase = (obj: Record<string, any>) => {
  return Object.keys(obj).reduce((acc, key) => {
    acc[snakeToCamel(key)] = obj[key];
    return acc;
  }, {} as Record<string, any>);
};
