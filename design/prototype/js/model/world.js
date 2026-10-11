/* Pure rules for the Loka lessons: years on a timeline, the Earth's spin and orbit, and maps. */
(function () {
  'use strict';

  /* ---------- timeline (I2) ---------- */
  /* Years are signed on the axis: 250 BCE is -250, 499 CE is 499. There is no year 0. */
  function signed(year, era) {
    if (!year || year < 1) throw new Error('Years start at 1: ' + year);
    return era === 'BCE' ? -year : year;
  }
  /* Whole years from a to b. Crossing the BCE/CE join skips the missing year 0. */
  function yearsBetween(a, b) {
    var lo = Math.min(a, b), hi = Math.max(a, b);
    return hi - lo - (lo < 0 && hi > 0 ? 1 : 0);
  }
  function isEarlier(a, b) { return a < b; }
  /* The 1st century CE is years 1 to 100, so 1947 is in the 20th. */
  function centuryCE(year) { return Math.ceil(year / 100); }
  var EVENTS = [
    { id: 'harappa', year: -2500, about: true },
    { id: 'ashoka', year: -250, about: true },
    { id: 'aryabhata', year: 499 },
    { id: 'taj', year: 1653, about: true },
    { id: 'independence', year: 1947 },
    { id: 'chandrayaan', year: 2023 }
  ];
  function chronological(ids) {
    var at = {};
    EVENTS.forEach(function (e) { at[e.id] = e.year; });
    return ids.every(function (id, i) { return i === 0 || at[ids[i - 1]] < at[id]; });
  }

  /* ---------- Earth (E1) ---------- */
  /* Local hour in India for a spin angle (0° = noon, facing the Sun; 90° = sunset; 180° = midnight). */
  function hourAt(spinDeg) { return (12 + Math.round(((spinDeg % 360) + 360) % 360 / 15)) % 24; }
  function isDay(hour) { return hour >= 6 && hour < 18; }
  /* Orbit position as a month (0 = January). The axis keeps pointing the same way, so the northern half
     leans toward the Sun in June and away in December. Distance to the Sun is not the cause. */
  function northernSeason(month) {
    if (month >= 4 && month <= 6) return 'summer';
    if (month === 11 || month <= 1) return 'winter';
    return month <= 3 ? 'spring' : 'autumn';
  }

  /* ---------- maps (E4) ---------- */
  var DIRS = { N: [0, -1], E: [1, 0], S: [0, 1], W: [-1, 0] };
  function step(at, dir) {
    var d = DIRS[dir];
    if (!d) throw new Error('Unknown direction: ' + dir);
    return [at[0] + d[0], at[1] + d[1]];
  }
  function walk(start, moves) {
    var path = [start];
    moves.forEach(function (m) { path.push(step(path[path.length - 1], m)); });
    return path;
  }
  /* The courtyard in E4: 8 columns by 6 rows, [column, row] from the top left. The house and the walls cannot be walked through. */
  var COURTYARD = { cols: 8, rows: 6, places: { gate: [1, 5], well: [6, 1], tulsi: [3, 2], tree: [1, 1], house: [[4, 3], [5, 3], [4, 4], [5, 4]] } };
  function isBlocked(c, r) {
    if (c < 0 || r < 0 || c >= COURTYARD.cols || r >= COURTYARD.rows) return true;
    return COURTYARD.places.house.some(function (h) { return h[0] === c && h[1] === r; });
  }
  /* Real distance: map squares times the scale, never plus. */
  function realDistance(squares, metresPerSquare) { return squares * metresPerSquare; }

  window.Sutra.model.world = {
    signed: signed, yearsBetween: yearsBetween, isEarlier: isEarlier, centuryCE: centuryCE, EVENTS: EVENTS, chronological: chronological,
    hourAt: hourAt, isDay: isDay, northernSeason: northernSeason,
    DIRS: DIRS, step: step, walk: walk, realDistance: realDistance, COURTYARD: COURTYARD, isBlocked: isBlocked
  };
})();
