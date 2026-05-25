import { useState } from "react";

import API from "../../services/api";


const ProfileForm = () => {

  const [formData, setFormData] =
    useState({

      bio: "",

      careerGoal: "",

      github: "",

      linkedin: "",

      portfolio: "",

      location: "",

      preferredRole: "",
    });


  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value,
    });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response =
        await API.put(
          "/profile",
          formData
        );

      alert(
        response.data.message
      );

    } catch (error) {

      console.log(error);
    }
  };


  return (

    <form
      onSubmit={handleSubmit}
    >

      <input
        type="text"
        name="careerGoal"
        placeholder="Career Goal"
        onChange={handleChange}
      />

      <input
        type="text"
        name="github"
        placeholder="GitHub"
        onChange={handleChange}
      />

      <input
        type="text"
        name="linkedin"
        placeholder="LinkedIn"
        onChange={handleChange}
      />

      <textarea
        name="bio"
        placeholder="Bio"
        onChange={handleChange}
      />

      <button type="submit">

        Save Profile

      </button>

    </form>
  );
};

export default ProfileForm;