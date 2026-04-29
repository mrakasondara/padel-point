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

export const getUserImageProfile = async (target) => {
  const storage = getStorage();

  const { data, error } = await storage
    .from("padel-point")
    .getPublicUrl(`users/${target}`);
  return { data, error };
};

export const updateUserImageProfile = async ({ path, file, oldImage }) => {
  const storage = getStorage();

  if (oldImage) {
    await deleteUserImageProfile(oldImage);
  }

  const { data, error } = await storage.from("padel-point").upload(path, file);
  return { data, error };
};

export const deleteUserImageProfile = async (oldImage) => {
  const storage = getStorage();

  const { data, error } = await storage
    .from("padel-point")
    .remove(`users/${oldImage}`);
  return { data, error };
};
