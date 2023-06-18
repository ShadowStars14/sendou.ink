import type { DamageType } from "./analyzer-types";
import { type MainWeaponId } from "~/modules/in-game-lists";

export const MAX_LDE_INTENSITY = 21;

export const DAMAGE_TYPE = [
  "NORMAL_MIN",
  "NORMAL_MAX",
  "NORMAL_MAX_FULL_CHARGE", // Hydra Splatling goes from 32 to 40 dmg when fully charged
  "DIRECT",
  "DIRECT_MIN",
  "DIRECT_MAX",
  "FULL_CHARGE",
  "MAX_CHARGE",
  "TAP_SHOT",
  "DISTANCE",
  "SPLASH",
  "WAVE",
  "BOMB_DIRECT",
  "BOMB_NORMAL",
  "SPLATANA_VERTICAL",
  "SPLATANA_VERTICAL_DIRECT",
  "SPLATANA_HORIZONTAL",
  "SPLATANA_HORIZONTAL_DIRECT",
  "SPLASH_MIN",
  "SPLASH_MAX",
  "SPLASH_VERTICAL_MIN",
  "SPLASH_VERTICAL_MAX",
  "SPLASH_HORIZONTAL_MIN",
  "SPLASH_HORIZONTAL_MAX",
  "ROLL_OVER",
] as const;

export const damageTypeToWeaponType: Record<
  DamageType,
  "MAIN" | "SUB" | "SPECIAL"
> = {
  NORMAL_MIN: "MAIN",
  NORMAL_MAX: "MAIN",
  NORMAL_MAX_FULL_CHARGE: "MAIN",
  DIRECT: "MAIN",
  DIRECT_MIN: "MAIN",
  DIRECT_MAX: "MAIN",
  FULL_CHARGE: "MAIN",
  MAX_CHARGE: "MAIN",
  TAP_SHOT: "MAIN",
  DISTANCE: "MAIN",
  SPLASH: "MAIN",
  BOMB_NORMAL: "SUB",
  BOMB_DIRECT: "SUB",
  SPLATANA_VERTICAL: "MAIN",
  SPLATANA_VERTICAL_DIRECT: "MAIN",
  SPLATANA_HORIZONTAL: "MAIN",
  SPLATANA_HORIZONTAL_DIRECT: "MAIN",
  SPLASH_MIN: "MAIN",
  SPLASH_MAX: "MAIN",
  SPLASH_HORIZONTAL_MAX: "MAIN",
  SPLASH_HORIZONTAL_MIN: "MAIN",
  SPLASH_VERTICAL_MAX: "MAIN",
  SPLASH_VERTICAL_MIN: "MAIN",
  ROLL_OVER: "MAIN",
  WAVE: "SPECIAL",
};

export const multiShot: Partial<Record<MainWeaponId, number>> = {
  // L-3
  300: 3,
  // H-3
  310: 3,
  // Tri-Stringer,
  7010: 3,
  // REEF-LUX,
  7020: 3,
  // Bloblobber
  3030: 4,
};

export const RAINMAKER_SPEED_PENALTY_MODIFIER = 0.8;

export const UNKNOWN_SHORT = "U";
