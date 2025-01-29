const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const uploadAvatar = async (file) => {
  if (!file) return null;

  const fileName = `avatars/${Date.now()}-${file.originalname}`;
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: true,
    });

  if (error) throw new Error("Failed to upload avatar");

  const { publicURL } = supabase.storage.from("avatars").getPublicUrl(fileName);
  return publicURL;
};

module.exports = uploadAvatar;
