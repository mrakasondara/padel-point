import { createSupabaseClient } from "../client";

function getStorage() {
  const { storage } = createSupabaseClient();
  return storage;
}

export const addCourtImage = async ({ path, file }) => {
  const storage = getStorage();

  const { data, error } = await storage.from("padel-point").upload(path, file);
  console.log({ file, data });
  return { data, error };
};
