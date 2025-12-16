// Configuración simple de los días: título corto + ruta relativa al juego
// Rellena o modifica los campos "title" y "gamePath" según vayas creando /games/dayXX/
export const DAYS = {
  1: { title: "Memory", gamePath: "games/Memory/index.html", hint: "🎟️ x 1 - Massatge de 10 minuts" },
  2: { title: "Trivial",    gamePath: "games/Trivial/index.html", hint: "Mira la butxaca petita de la meva motxilla" },
  3: { title: "Copitos",      gamePath: "games/Copitos/index.html", hint: "🎟️ x 1 - Dia de cine (avui es bon dia...)" },
  4: { title: "Salturriento",      gamePath: "games/Salturriento/index.html", hint: "🎟️ x 5 - Intents per tu peluchito de Stitch navideño" },
  5: { title: "Puzzle",      gamePath: "games/Puzzle/index.html", hint: "🎟️ x 1 - Cita romàntica amb cenita, yo m'ocupo de tot (fecha sorpresa)" },
  6: { title: "Simon",      gamePath: "games/Simon/index.html", hint: "Hi ha algo amagat per la habitació, haurem de jugar a fio o caliente..." },
  7: { title: "Sudoku",      gamePath: "games/Sudoku/index.html", hint: "Busca a la caixa: T" },
  8: { title: "Snake",      gamePath: "games/Snake/index.html", hint: "Busca a la caixa: E" },
  9: { title: "Fotos en ordre",      gamePath: "games/Fotos/index.html", hint: "Busca a la caixa: S" },
  10: { title: "Breakout",      gamePath: "games/Breakout/index.html", hint: "Busca a la caixa: T" },
  11: { title: "Topitos",      gamePath: "games/Topitos/index.html", hint: "Busca a la caixa: I" },
  12: { title: "Rudolphs",      gamePath: "games/Rudolphs/index.html", hint: "Busca a la caixa: M" },
  13: { title: "Tetrix",      gamePath: "games/Tetrix/index.html", hint: "Busca a la caixa: O" },
  14: { title: "Laberint",      gamePath: "games/Laberint/index.html", hint: "Busca a la caixa: 𝝿" },
  15: { title: "Carta",      gamePath: "games/Carta/index.html", hint: "Busca a la caixa: T" },
  16: { title: "Sopa",      gamePath: "games/Sopa/index.html", hint: "Busca a la caixa: U" },
  17: { title: "Trencaneu",      gamePath: "games/Trencaneu/index.html", hint: "Busca a la caixa: F" },
  18: { title: "Caixa",      gamePath: "games/Caixa/index.html", hint: "Busca a la caixa: A" },
  19: { title: "Missatge",      gamePath: "games/Missatge/index.html", hint: "---" },
  20: { title: "TODO",      gamePath: "games/day20/index.html", hint: "---" },
  21: { title: "TODO",      gamePath: "games/day21/index.html", hint: "---" },
  22: { title: "TODO",      gamePath: "games/day22/index.html", hint: "---" },
  23: { title: "TODO",      gamePath: "games/day23/index.html", hint: "---" },
  24: { title: "TODO",    gamePath: "games/day24/index.html", hint: "---" }
};

// Configs globales
export const CONFIG = {
  secretCode: "love",         // código maestro para abrir antes
  strictByDate: true,         // true = solo desbloquea por fecha
  timezoneOffsetDays: 0       // permite ajustar si quieres forzar otro 'día' (p.ej. -1)
};
