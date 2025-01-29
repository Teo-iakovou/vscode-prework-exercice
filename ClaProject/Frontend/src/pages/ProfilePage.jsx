import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const ProfilePage = ({ user }) => {
  const [profile, setProfile] = useState({
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    about: user.about || "",
  });
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("first_name", profile.first_name);
    formData.append("last_name", profile.last_name);
    formData.append("about", profile.about);
    if (avatar) formData.append("avatar", avatar);

    try {
      const token = Cookies.get("token");
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/coders/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Profile updated:", response.data);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Update Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="first_name"
          value={profile.first_name}
          onChange={handleChange}
          placeholder="First Name"
          className="p-2 border rounded w-full"
          required
        />
        <input
          type="text"
          name="last_name"
          value={profile.last_name}
          onChange={handleChange}
          placeholder="Last Name"
          className="p-2 border rounded w-full"
          required
        />
        <textarea
          name="about"
          value={profile.about}
          onChange={handleChange}
          placeholder="About Me"
          className="p-2 border rounded w-full"
        ></textarea>
        <input
          type="file"
          onChange={handleFileChange}
          className="p-2 border rounded w-full"
        />

        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded w-full"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
