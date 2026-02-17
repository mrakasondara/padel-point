export const successStyle = {
  "--normal-bg": "var(--color-green-100/50)",
  "--normal-text": "light-dark(var(--color-green-600), var(--color-green-400))",
  "--normal-border":
    "light-dark(var(--color-green-600), var(--color-green-400))",
};

export const errorStyle = {
  "--normal-bg":
    "color-mix(in oklab, var(--destructive) 10%, var(--background))",
  "--normal-text": "var(--destructive)",
  "--normal-border": "var(--destructive)",
};

export const infoStyle = {
  "--normal-bg":
    "color-mix(in oklab, light-dark(var(--color-sky-600), var(--color-sky-400)) 10%, var(--background))",
  "--normal-text": "light-dark(var(--color-sky-600), var(--color-sky-400))",
  "--normal-border": "light-dark(var(--color-sky-600), var(--color-sky-400))",
};

export const warningStyle = {
  "--normal-bg":
    "color-mix(in oklab, light-dark(var(--color-amber-600), var(--color-amber-400)) 10%, var(--background))",
  "--normal-text": "light-dark(var(--color-amber-600), var(--color-amber-400))",
  "--normal-border":
    "light-dark(var(--color-amber-600), var(--color-amber-400))",
};
