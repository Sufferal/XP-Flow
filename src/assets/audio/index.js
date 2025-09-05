import firstBlood from './01_firstblood.mp3';
import doubleKill from './02_doublekill.mp3';
import killingSpree from './03_killingspree.mp3';
import tripleKill from './04_triplekill.mp3';
import megaKill from './05_megakill.mp3';
import ultraKill from './06_ultrakill.mp3';
import ownage from './07_ownage.mp3';
import dominating from './08_dominating.mp3';
import unstoppable from './09_unstoppable.mp3';
import wickedSick from './10_wickedsick.mp3';
import monsterKill from './11_monsterkill.mp3';
import godLike from './12_godlike.mp3';
import holyShit from './13_holyshit.mp3';
import rampage from './14_rampage.mp3';
import missionComplete from './mission_complete.mp3';
import sekiroDeathblow from './sekiro_deathblow.mp3';
import sekiroChill from './sekiro_chill.mp3';
import alarm from './alarm.mp3';
import patapim from './brrr-brrr-patapim.mp3';
import romanianSensors from './romanian_sensors.mp3';

export const SOUNDPACK = {
  soundEffect1: firstBlood,
  soundEffect2: doubleKill,
  soundEffect3: killingSpree,
  soundEffect4: tripleKill,
  soundEffect5: megaKill,
  soundEffect6: wickedSick,
  soundEffect7: ownage,
  soundEffect8: dominating,
  soundEffect9: unstoppable,
  soundEffect10: monsterKill,
  soundEffect11: ultraKill,
  soundEffect12: godLike,
  soundEffect13: rampage,
  soundEffect14: holyShit,
  sfxMissionComplete: missionComplete,
  sfxDeathblow: sekiroDeathblow,
  sfxChill: sekiroChill,
  sfxAlarm: alarm,
  sfxPatapim: patapim,
  sfxRomanianSensors: romanianSensors,
};

export const SOUNDPACK_LENGTH = Object.keys(SOUNDPACK).length;

// Helper function to get a random sound from SOUNDPACK (excluding timerFinished)
export const getRandomSound = () => {
  const keys = Object.keys(SOUNDPACK).filter(key => key !== 'timerFinished');
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return SOUNDPACK[randomKey];
};

export const getSoundByKey = key => {
  return SOUNDPACK[key] || SOUNDPACK.sfxDeathblow;
};
