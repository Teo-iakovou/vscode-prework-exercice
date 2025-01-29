const Coder = require("../models/Coder");
const uploadAvatar = require("../utils/supabaseUploader");

const updateProfile = async (coderId, data, file) => {
  const avatarUrl = file ? await uploadAvatar(file) : null;

  const updatedFields = {
    first_name: data.first_name,
    last_name: data.last_name,
    about: data.about,
    ...(avatarUrl && { avatar: avatarUrl }),
  };

  const updatedCoder = await Coder.findByIdAndUpdate(coderId, updatedFields, {
    new: true,
  });

  return updatedCoder;
};

module.exports = updateProfile;
