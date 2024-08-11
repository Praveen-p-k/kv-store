import promptSync from "prompt-sync";

const prompt = promptSync();

export { prompt };

export const log = (...params) => {
  console.log(...params);
};
