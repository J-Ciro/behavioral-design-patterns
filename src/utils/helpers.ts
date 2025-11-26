/**
 * Utilidades generales de la aplicación
 */

/**
 * Valida que un objeto tenga una estructura esperada
 */
export const validateObject = <T>(
  obj: unknown,
  expectedKeys: (keyof T)[]
): obj is T => {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  return expectedKeys.every((key) => key in obj);
};

/**
 * Formatea una fecha/timestamp para mostrar
 */
export const formatTimestamp = (timestamp: string): string => {
  return timestamp;
};

/**
 * Crea un retardo (delay) útil para operaciones async
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
