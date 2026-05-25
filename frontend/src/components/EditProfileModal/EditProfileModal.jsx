import React, { useState, } from "react";

import { updateProfile, } from "../../services/dashboardServices";

import "./EditProfileModal.css"

const EditProfileModal = ({

  dashboard,

  onClose,

  refreshDashboard,

}) => {


  const [formData, setFormData] =
    useState({

      bio:
        dashboard?.profile?.bio || "",

      careerGoal:
        dashboard?.profile?.careerGoal || "",

      github:
        dashboard?.profile?.github || "",

      linkedin:
        dashboard?.profile?.linkedin || "",

      location:
        dashboard?.profile?.location || "",

      preferredRole:
        dashboard?.profile?.preferredRole || "",
    });


  // HANDLE CHANGE
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };


  // SUBMIT
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await updateProfile(formData);

        await refreshDashboard();

        onClose();

      } catch (error) {

        console.log(error);
      }
    };


  return (

    <div className="modal-overlay">

      <div className="modal-container">

        <h2>Edit Profile</h2>

        <form onSubmit={handleSubmit}>


          <input

            type="text"

            name="preferredRole"

            placeholder="Preferred Role"

            value={formData.preferredRole}

            onChange={handleChange}
          />


          <input

            type="text"

            name="location"

            placeholder="Location"

            value={formData.location}

            onChange={handleChange}
          />


          <input

            type="text"

            name="github"

            placeholder="GitHub Link"

            value={formData.github}

            onChange={handleChange}
          />


          <input

            type="text"

            name="linkedin"

            placeholder="LinkedIn Link"

            value={formData.linkedin}

            onChange={handleChange}
          />


          <input

            type="text"

            name="careerGoal"

            placeholder="Career Goal"

            value={formData.careerGoal}

            onChange={handleChange}
          />


          <input

            type="text"

            name="bio"

            placeholder="Bio"

            value={formData.bio}

            onChange={handleChange}
          />


          <div className="modal-buttons">

            <button type="submit">

              Save

            </button>

            <button
              type="button"

              onClick={onClose}
            >

              Cancel

            </button>

          </div>

        </form>

      </div>

    </div>
  );
};


export default EditProfileModal;