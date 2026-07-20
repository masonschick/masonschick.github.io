(() => {
  function computeThemeState(now) {
    const LAT = 41.8781;
    const LNG = -87.6298;
    const rad = Math.PI / 180;
    const dayMs = 86400000;
    const J1970 = 2440588;
    const J2000 = 2451545;
    const e = rad * 23.4397;
    const toDays = (ms) => ms / dayMs - 0.5 + J1970 - J2000;
    const solarMeanAnomaly = (d) => rad * (357.5291 + 0.98560028 * d);
    const eclipticLongitude = (M) => {
      const C = rad * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M));
      return M + C + rad * 102.9372 + Math.PI;
    };
    const phi = rad * LAT;
    const lw = rad * -LNG;
    const J0 = 0.0009;
    const times = (forMs) => {
      const d = toDays(forMs);
      const n = Math.round(d - J0 - lw / (2 * Math.PI));
      const ds = J0 + lw / (2 * Math.PI) + n;
      const M = solarMeanAnomaly(ds);
      const L = eclipticLongitude(M);
      const dec = Math.asin(Math.sin(e) * Math.sin(L));
      const Jnoon = J2000 + ds + 0.0053 * Math.sin(M) - 0.0069 * Math.sin(2 * L);
      const w0 = Math.acos(
        (Math.sin(-0.833 * rad) - Math.sin(phi) * Math.sin(dec)) / (Math.cos(phi) * Math.cos(dec)),
      );
      const dsSet = J0 + (w0 + lw) / (2 * Math.PI) + n;
      const Jset = J2000 + dsSet + 0.0053 * Math.sin(M) - 0.0069 * Math.sin(2 * L);
      const Jrise = Jnoon - (Jset - Jnoon);
      const toMs = (j) => (j + 0.5 - J1970) * dayMs;
      return { sunrise: toMs(Jrise), sunset: toMs(Jset) };
    };

    const today = times(now);
    if (now < today.sunrise) {
      return { theme: "dark", next: today.sunrise };
    }
    if (now < today.sunset) {
      return { theme: "light", next: today.sunset };
    }
    return { theme: "dark", next: times(now + dayMs).sunrise };
  }

  function apply() {
    const state = computeThemeState(Date.now());
    document.documentElement.dataset.theme = state.theme;
    document.documentElement.dataset.themeTransition = new Date(state.next).toISOString();
    return state;
  }

  let transitionTimer;

  function sync() {
    const state = apply();
    window.clearTimeout(transitionTimer);
    transitionTimer = window.setTimeout(sync, Math.max(1000, state.next - Date.now() + 1000));
  }

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) sync();
  });
  window.addEventListener("focus", sync);
  sync();
})();
