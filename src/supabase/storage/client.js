import { createSupabaseClient } from "../client";

function getStorage() {
  const { storage } = createSupabaseClient();
  return storage;
}

export const getCourtImage = async (target) => {
  const storage = getStorage();

  const { data, error } = await storage
    .from("padel-point")
    .getPublicUrl(`courts/${target}`);
  return { data, error };
};

export const addCourtImage = async ({ path, file }) => {
  const storage = getStorage();

  const { data, error } = await storage.from("padel-point").upload(path, file);
  return { data, error };
};
