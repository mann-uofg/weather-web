export const formatDate = (timestamp: number, timezone: number): string => {
  const date = new Date((timestamp + timezone) * 1000);
  
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  return date.toLocaleString('en-US', options);
};

export const formatDay = (timestamp: number, timezone: number): string => {
  const date = new Date((timestamp + timezone) * 1000);
  
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  };
  
  return date.toLocaleString('en-US', options);
};

export const formatTime = (timestamp: number, timezone: number): string => {
  const date = new Date((timestamp + timezone) * 1000);
  
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit'
  };
  
  return date.toLocaleString('en-US', options);
};

export const isDayTime = (dt: number, sunrise: number, sunset: number): boolean => {
  return dt >= sunrise && dt < sunset;
};