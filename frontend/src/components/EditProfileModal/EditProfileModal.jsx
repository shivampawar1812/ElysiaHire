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

      shortBio:
        dashboard?.profile?.shortBio || "",

      preferredRole:
        dashboard?.profile?.preferredRole || "",

      location:
        dashboard?.profile?.location || "",

      github:
        dashboard?.profile?.github || "",

      linkedin:
        dashboard?.profile?.linkedin || "",

      targetCompanies:
        dashboard?.profile?.targetCompanies
          ?.join(", ") || "",

      experienceLevel:
        dashboard?.profile?.experienceLevel || "Student",

      graduationYear:
        dashboard?.profile?.graduationYear || "",

      currentEducationLevel:
        dashboard?.profile
          ?.currentEducationLevel || "",
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
        const payload = {

          ...formData,

          targetCompanies:
            formData.targetCompanies

              .split(",")

              .map((company) =>
                company.trim()
              )

              .filter(Boolean),
        };
        await updateProfile(payload);

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

            name="shortBio"

            placeholder="Short Professional Bio"

            value={formData.shortBio}

            onChange={handleChange}
          />


          <input

            type="text"

            name="targetCompanies"

            placeholder="Target Companies (comma separated)"

            value={formData.targetCompanies}

            onChange={handleChange}
          />

          <select

            name="experienceLevel"

            value={formData.experienceLevel}

            onChange={handleChange}
          >

            <option value="Student">
              Student
            </option>

            <option value="Beginner">
              Beginner
            </option>

            <option value="Intermediate">
              Intermediate
            </option>

            <option value="Advanced">
              Advanced
            </option>

          </select>

          <input

            type="number"

            name="graduationYear"

            placeholder="Graduation Year"

            value={formData.graduationYear}

            onChange={handleChange}
          />

          <select

            name="currentEducationLevel"

            value={
              formData.currentEducationLevel
            }

            onChange={handleChange}
          >

            <option value="">
              Select Education Level
            </option>

            <option value="High School">
              High School
            </option>

            <option value="Diploma">
              Diploma
            </option>

            <option value="BTech">
              BTech
            </option>

            <option value="BCA">
              BCA
            </option>

            <option value="BSc">
              BSc
            </option>

            <option value="MTech">
              MTech
            </option>

            <option value="MCA">
              MCA
            </option>

            <option value="MSc">
              MSc
            </option>

            <option value="MBA">
              MBA
            </option>

            <option value="Self-Taught">
              Self-Taught
            </option>

          </select>

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