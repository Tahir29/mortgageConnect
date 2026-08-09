import { clsx } from "clsx";

export function cn(...inputs) {
  return clsx(inputs);
}

/**
 * URL-safe slug from a display name: "M. Rumzee Mubarak" -> "m-rumzee-mubarak".
 * NFD splits accented letters into base + combining mark; \p{M} then drops the
 * mark so "Renée" collapses to "renee" rather than splitting into "rene-e".
 */
export function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Display an E.164 UAE number as "+971 58 531 8803". Falls back to the input. */
export function formatPhone(phone) {
  const digits = String(phone).replace(/\D/g, "");
  const local = digits.startsWith("971") ? digits.slice(3) : digits;
  if (local.length !== 9) return phone;
  return `+971 ${local.slice(0, 2)} ${local.slice(2, 5)} ${local.slice(5)}`;
}

/** Digits-only form for wa.me / tel: links. */
export function toDialable(phone) {
  return String(phone).replace(/\D/g, "");
}
