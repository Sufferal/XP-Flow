import { useState, useRef, useEffect } from 'react';
import { Input } from '../inputs/Input';
import {
  formatTimer,
  getTotalSeconds,
  secondsToTimer,
  startTimer,
  stopTimer,
  stringToTimer,
  validateTimer,
} from '../../utils/timer';
import useAudio from '../../hooks/useAudio';
import { SOUNDPACK } from '../../assets/audio';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../buttons/Button';
import { VARIANT } from '../../constants/styles';
import { PRIMARY_SHORTCUTS_TIMER } from '../../constants';
import useKeyboardShortcut from '../../hooks/useKeyboardShortcut';

export const Timer = ({
  title,
  defaultTimer = '10:00',
  shortcuts = PRIMARY_SHORTCUTS_TIMER,
}) => {
  const [defaultSeconds = 0, defaultMinutes = 0, defaultHours = 0] =
    stringToTimer(defaultTimer);
  const [timer, setTimer] = useState({
    hours: defaultHours ?? 0,
    minutes: defaultMinutes ?? 50,
    seconds: defaultSeconds ?? 0,
  });
  const initialTimerRef = useRef(1);
  const timerIntervalRef = useRef(null);
  const [timerInput, setTimerInput] = useState(defaultTimer);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [error, setError] = useState('');
  const { playSound } = useAudio();
  const currentTimerSeconds = getTotalSeconds(
    timer.hours,
    timer.minutes,
    timer.seconds
  );
  const progressRatio = currentTimerSeconds / initialTimerRef.current;
  const hasTimerStarted = !(progressRatio === currentTimerSeconds);
  const inputRef = useRef(null);
  const {
    start: startKey,
    pause: pauseKey,
    reset: resetKey,
    focus: focusKey,
  } = shortcuts;

  const revertTimer = initialTimer => {
    const resumedTimer = secondsToTimer(initialTimerRef.current);
    const currentTimer = initialTimer || resumedTimer;
    setTimer(currentTimer);
    initialTimerRef.current = getTotalSeconds(
      currentTimer.hours,
      currentTimer.minutes,
      currentTimer.seconds
    );
    timerIntervalRef.current = startTimer(
      initialTimerRef.current,
      timer,
      setTimer
    );
  };

  const handleSubmit = (e = null) => {
    if (e) {
      e.preventDefault();
    }
    stopTimer(timerIntervalRef.current);
    const { isValid, errorMsg } = validateTimer(timerInput);

    if (isValid) {
      setError('');
      const [seconds = 0, minutes = 0, hours = 0] = stringToTimer(timerInput);
      setIsTimerPaused(false);
      setTimer({ hours, minutes, seconds });
      initialTimerRef.current = getTotalSeconds(hours, minutes, seconds);
      timerIntervalRef.current = startTimer(
        initialTimerRef.current,
        timer,
        setTimer
      );
    } else {
      setError(errorMsg);
    }
  };

  const handleTogglePause = () => {
    if (!isTimerPaused) {
      initialTimerRef.current = getTotalSeconds(
        timer.hours,
        timer.minutes,
        timer.seconds
      );
      stopTimer(timerIntervalRef.current);
    }

    if (isTimerPaused) {
      const resumedTimer = secondsToTimer(initialTimerRef.current);
      setTimer(resumedTimer);
      initialTimerRef.current = getTotalSeconds(
        resumedTimer.hours,
        resumedTimer.minutes,
        resumedTimer.seconds
      );
      timerIntervalRef.current = startTimer(
        initialTimerRef.current,
        timer,
        setTimer
      );
    }

    setIsTimerPaused(prev => !prev);
  };

  const handleReset = () => {
    stopTimer(timerIntervalRef.current);
    setIsTimerPaused(false);
    revertTimer({
      hours: defaultHours,
      minutes: defaultMinutes,
      seconds: defaultSeconds,
    });
  };

  useEffect(() => {
    if (!timer.hours && !timer.minutes && !timer.seconds) {
      stopTimer(timerIntervalRef.current);
      playSound(SOUNDPACK.sfxChill);
    }
  }, [timer]);

  useEffect(() => {
    return () => stopTimer(timerIntervalRef.current);
  }, []);

  useKeyboardShortcut(focusKey, () => inputRef.current.focus());
  useKeyboardShortcut(startKey, handleSubmit);
  useKeyboardShortcut(
    pauseKey,
    hasTimerStarted ? handleTogglePause : undefined
  );
  useKeyboardShortcut(resetKey, hasTimerStarted ? handleReset : undefined);

  return (
    <div className="inline-flex flex-col w-96">
      <h2 className="font-semibold text-4xl mb-4">{title}</h2>
      <form onSubmit={handleSubmit}>
        <Input
          ref={inputRef}
          id={uuidv4()}
          value={timerInput}
          onChange={e => setTimerInput(e.target.value)}
          label="Timer"
          placeholder="hh:mm:ss"
          error={error}
          required
          autoComplete="off"
        />
      </form>
      <p className="mt-5 bg-slate-900 text-white px-2 py-1 rounded-md text-center text-3xl rounded-b-none">
        {formatTimer(timer)}
      </p>
      <div className="w-full bg-stone-50 rounded-md h-8 flex items-center border-slate-900 border-2 rounded-t-none">
        <div
          className="bg-slate-900 h-3 rounded-full mx-1 transition-all duration-500"
          style={{ width: `${(progressRatio * 100).toFixed(2)}%` }}
        ></div>
      </div>
      {!hasTimerStarted && (
        <div className="mt-3">
          <Button onClick={handleSubmit} fullWidth variant={VARIANT.outline}>
            Start
          </Button>
        </div>
      )}
      {hasTimerStarted && (
        <div className="mt-2 flex gap-3">
          <Button onClick={handleTogglePause} fullWidth>
            {isTimerPaused ? 'Resume' : 'Pause'}
          </Button>
          <Button onClick={handleReset} variant={VARIANT.danger} fullWidth>
            Reset
          </Button>
        </div>
      )}
    </div>
  );
};
