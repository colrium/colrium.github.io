/**
 * Creates a debounced version of the provided function.
 * @param callback The function to debounce.
 * @param delay The delay in milliseconds.
 */
export function debounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: Parameters<T>): void {
    // Clear any existing pending timeout
    if (timer !== null) {
      clearTimeout(timer);
    }

    // Set a new timeout to execute the callback
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}