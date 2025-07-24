import { HOUR_TO_SEC, MIN_TO_SEC } from '../constants';

export const validateTimer = (timer = '', delimiter = ':') => {
  if (typeof timer !== 'string')
    return { isValid: false, errorMsg: 'The value must be a string.' };

  const timerRegex = /^[0-9:]+$/g;
  if (!timerRegex.test(timer))
    return {
      isValid: false,
      errorMsg: 'It must contain only numbers and colon :',
    };

  const time = timer.split(delimiter);
  if (!time.length || time.length > 3) {
    return {
      isValid: false,
      errorMsg: 'Only 3 values are allowed (hh:mm:ss)',
    };
  }
  const invalidTimes = time?.filter(el => Number(el) >= 60);
  if (invalidTimes.length) {
    return {
      isValid: false,
      errorMsg: 'The values must be lower than 60',
    };
  }
  const allZeros = time?.every(el => Number(el) === 0);
  if (allZeros) {
    return {
      isValid: false,
      errorMsg: 'Cannot set the timer to 0 seconds',
    };
  }

  return { isValid: true, message: 'Timer is valid' };
};

export const formatTimer = (timer = {}) => {
  if (!Object.keys(timer).length) {
    throw new Error('Cannot display an empty timer');
  }

  const paddedHours = String(timer.hours).padStart(2, '0');
  const paddedMinutes = String(timer.minutes).padStart(2, '0');
  const paddedSeconds = String(timer.seconds).padStart(2, '0');

  if (!timer.hours && !timer.minutes && !timer.seconds) {
    return 'Timer Finished +';
  }

  if (!timer.hours && !timer.minutes) {
    return `${paddedSeconds}`;
  }

  if (!timer.hours) {
    return `${paddedMinutes}:${paddedSeconds}`;
  }

  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
};

export const secondsToTimer = seconds => {
  return {
    hours: Math.floor(seconds / HOUR_TO_SEC),
    minutes: Math.floor((seconds % HOUR_TO_SEC) / 60),
    seconds: seconds % 60,
  };
};

export const stringToTimer = (str = '') => {
  if (typeof str !== 'string' || !str.length) return '';
  const parts = str.split(':').map(Number);
  // Array destructuring then pulls the values from the reversed array.
  // If a value doesn't exist at a certain position (e.g., no hours part),
  // it automatically uses the default value you provided (= 0).
  return parts.reverse();
};

export const getTotalSeconds = (hours = 0, minutes = 0, seconds = 0) => {
  return hours * HOUR_TO_SEC + minutes * MIN_TO_SEC + seconds;
};

export const getNextTickTimer = (timer = {}) => {
  if (!Object.keys(timer).length) {
    throw new Error('Cannot start an empty timer');
  }

  if (timer.hours > 0 && !timer.seconds && !timer.seconds) {
    return {
      hours: timer.hours - 1,
      minutes: 59,
      seconds: 59,
    };
  }

  if (timer.minutes > 0 && !timer.seconds) {
    return {
      ...timer,
      minutes: timer.minutes - 1,
      seconds: 59,
    };
  }

  return {
    ...timer,
    seconds: timer.seconds - 1,
  };
};

export const startTimer = (initialSeconds = 0, timer = {}, setTimer) => {
  if (!Object.keys(timer).length) {
    throw new Error('Cannot start an empty timer');
  }

  const endTime = Date.now() + initialSeconds * 1000 + 1000;

  const intervalId = setInterval(() => {
    const now = Date.now();
    const remainingSeconds = Math.max(0, Math.floor((endTime - now) / 1000));
    setTimer(secondsToTimer(remainingSeconds));
  }, 500);

  return intervalId;
};

export const stopTimer = timerId => clearInterval(timerId);
