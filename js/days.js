// Configuración simple de los días: título corto + ruta relativa al juego
// Rellena o modifica los campos "title" y "gamePath" según vayas creando /games/dayXX/
export const DAYS = {
  1: { title: "Memory", gamePath: "games/day01/index.html", hint: "🎟️ x 1 - Massatge de 10 minuts" },
  2: { title: "Trivial",    gamePath: "games/day02/index.html", hint: "Mira la butxaca petita de la meva motxilla" },
  3: { title: "Copitos",      gamePath: "games/day03/index.html", hint: "🎟️ x 1 - Dia de cine (avui es bon dia...)" },
  4: { title: "Salturriento",      gamePath: "games/day04/index.html", hint: "🎟️ x 5 - Intents per tu peluchito de Stitch navideño" },
  5: { title: "Puzzle",      gamePath: "games/day05/index.html", hint: "🎟️ x 1 - Cita romàntica amb cenita, yo m'ocupo de tot (fecha sorpresa)" },
  6: { title: "Simon",      gamePath: "games/day06/index.html", hint: "---" },
  7: { title: "Sudoku",      gamePath: "games/day07/index.html", hint: "---" },
  8: { title: "Snake",      gamePath: "games/day08/index.html", hint: "---" },
  9: { title: "Fotos en ordre",      gamePath: "games/day09/index.html", hint: "---" },
  10: { title: "Breakout",      gamePath: "games/day10/index.html", hint: "---" },
  11: { title: "Topitos",      gamePath: "games/day11/index.html", hint: "---" },
  12: { title: "Rudolphs",      gamePath: "games/day12/index.html", hint: "---" },
  13: { title: "Tetrix",      gamePath: "games/day13/index.html", hint: "---" },
  14: { title: "TODO",      gamePath: "games/day14/index.html", hint: "---" },
  15: { title: "Carta",      gamePath: "games/day15/index.html", hint: "---" },
  16: { title: "TODO",      gamePath: "games/day16/index.html", hint: "---" },
  17: { title: "Laberint",      gamePath: "games/day17/index.html", hint: "---" },
  18: { title: "TODO",      gamePath: "games/day18/index.html", hint: "---" },
  19: { title: "Trencaneu",      gamePath: "games/day19/index.html", hint: "---" },
  20: { title: "Sopa",      gamePath: "games/day20/index.html", hint: "---" },
  21: { title: "TODO",      gamePath: "games/day21/index.html", hint: "---" },
  22: { title: "Caixa",      gamePath: "games/day22/index.html", hint: "---" },
  23: { title: "Missatge",      gamePath: "games/day23/index.html", hint: "---" },
  24: { title: "TODO",    gamePath: "games/day24/index.html", hint: "---" }
};

// Configs globales
export const CONFIG = {
  secretCode: "love",         // código maestro para abrir antes
  strictByDate: true,         // true = solo desbloquea por fecha
  timezoneOffsetDays: 0       // permite ajustar si quieres forzar otro 'día' (p.ej. -1)
};
