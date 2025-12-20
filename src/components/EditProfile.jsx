import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constant";
import UserCard from "./userCard";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  // CORE FIELDS
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");

  // ARRAY FIELDS (IMPORTANT)
  const [skills, setSkills] = useState([]);
  const [skillsInput, setSkillsInput] = useState("");

  const [interests, setInterests] = useState([]);
  const [interestsInput, setInterestsInput] = useState("");

  // OTHER INFO
  const [location, setLocation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [company, setCompany] = useState("");
  const [education, setEducation] = useState("");

  // SOCIAL
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  /* ---------------- SYNC USER DATA ---------------- */
  useEffect(() => {
    if (!user) return;

    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setPhotoUrl(user.photoUrl || "");
    setAge(user.age || "");
    setGender(user.gender || "");
    setAbout(user.about || "");

    const s = user.skills || [];
    setSkills(s);
    setSkillsInput(s.join(", "));

    const i = user.interests || [];
    setInterests(i);
    setInterestsInput(i.join(", "));

    setLocation(user.location || "");
    setOccupation(user.occupation || "");
    setCompany(user.company || "");
    setEducation(user.education || "");

    setGithub(user.social?.github || "");
    setLinkedin(user.social?.linkedin || "");
    setPortfolio(user.social?.portfolio || "");
  }, [user]);

  /* ---------------- COMPLETION ---------------- */
  const completion = useMemo(() => {
    const fields = [
      firstName,
      photoUrl,
      about,
      age,
      gender,
      location,
      occupation,
      skills.length > 0,
    ];
    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  }, [firstName, photoUrl, about, age, gender, location, occupation, skills]);

  /* ---------------- SAVE ---------------- */
  const saveProfile = async () => {
    setSaving(true);
    try {
      const payload = {
        firstName,
        lastName,
        photoUrl,
        about,
        age: age ? Number(age) : undefined,
        gender,
        skills,
        interests,
        location,
        occupation,
        company,
        education,
        social: { github, linkedin, portfolio },
      };

      Object.keys(payload).forEach(
        (k) => payload[k] === "" && delete payload[k]
      );

      const res = await axios.patch(`${BASE_URL}/profile/edit`, payload, {
        withCredentials: true,
      });

      if (res.data?.data) {
        dispatch(addUser(res.data.data));
        setToast({ type: "success", text: "Profile updated successfully" });
      }
    } catch {
      setToast({ type: "error", text: "Failed to update profile" });
    } finally {
      setSaving(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  const previewUser = {
    firstName,
    lastName,
    photoUrl,
    about,
    age,
    gender,
    skills,
    interests,
    location,
    occupation,
    company,
    education,
  };

  return (
    <div className="min-h-screen py-10 bg-[linear-gradient(to_bottom_right,#ffe0f7,#e6e7ff,#e0f1ff)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 px-6">

        {/* LEFT FORM */}
        <div className="lg:col-span-7 bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/40">

          {/* COMPLETION */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-gray-700">Profile completion</span>
              <span className="font-semibold text-indigo-600">{completion}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 rounded-full bg-linear-to-r from-indigo-500 to-pink-500"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>

          {/* NAME */}
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" value={firstName} setter={setFirstName} />
            <Input label="Last Name" value={lastName} setter={setLastName} />
          </div>

          {/* PHOTO URL */}
          <div className="mt-4">
            <Input label="Photo URL" value={photoUrl} setter={setPhotoUrl} />
          </div>

          {/* AGE + GENDER */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Input label="Age" type="number" value={age} setter={setAge} />
            <Select
              label="Gender"
              value={gender}
              setter={setGender}
              options={["male", "female", "other"]}
            />
          </div>

          <TextArea label="About" value={about} setter={setAbout} />

          {/* SKILLS */}
          <Input
            label="Skills (comma separated)"
            value={skillsInput}
            setter={(v) => {
              setSkillsInput(v);
              setSkills(v.split(",").map((s) => s.trim()).filter(Boolean));
            }}
          />

          {/* INTERESTS */}
          <Input
            label="Interests (comma separated)"
            value={interestsInput}
            setter={(v) => {
              setInterestsInput(v);
              setInterests(v.split(",").map((s) => s.trim()).filter(Boolean));
            }}
          />

          {/* WORK */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Input label="Location" value={location} setter={setLocation} />
            <Input label="Occupation" value={occupation} setter={setOccupation} />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Input label="Company" value={company} setter={setCompany} />
            <Input label="Education" value={education} setter={setEducation} />
          </div>

          {/* SOCIAL */}
          <div className="mt-6 p-5 rounded-2xl bg-white/60 border border-white/40">
            <div className="font-semibold mb-3">Social links</div>
            <Input label="GitHub" value={github} setter={setGithub} />
            <Input label="LinkedIn" value={linkedin} setter={setLinkedin} />
            <Input label="Portfolio" value={portfolio} setter={setPortfolio} />
          </div>

          <button
            onClick={saveProfile}
            disabled={saving}
            className={`w-full mt-6 py-3 rounded-xl text-white font-semibold text-lg ${
              saving
                ? "bg-gray-400"
                : "bg-linear-to-r from-indigo-600 to-pink-600 hover:scale-[1.02]"
            }`}
          >
            {saving ? "Saving…" : "Save changes"}
          </button>

          {toast && (
            <div className={`mt-3 text-sm ${
              toast.type === "success" ? "text-green-700" : "text-red-700"
            }`}>
              {toast.text}
            </div>
          )}
        </div>

        {/* RIGHT PREVIEW */}
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <p className="text-sm font-semibold text-gray-700 mb-2">Live preview</p>
            <UserCard user={previewUser} mode="preview" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Input = ({ label, value, setter, type = "text" }) => (
  <div className="mt-4">
    <label className="text-xs font-medium text-gray-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => setter(e.target.value)}
      className="w-full mt-1 px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-300 outline-none"
    />
  </div>
);

const TextArea = ({ label, value, setter }) => (
  <div className="mt-4">
    <label className="text-xs font-medium text-gray-700">{label}</label>
    <textarea
      rows="4"
      value={value}
      onChange={(e) => setter(e.target.value)}
      className="w-full mt-1 px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-300 outline-none resize-none"
    />
  </div>
);

const Select = ({ label, value, setter, options }) => (
  <div className="mt-4">
    <label className="text-xs font-medium text-gray-700">{label}</label>
    <select
      value={value}
      onChange={(e) => setter(e.target.value)}
      className="w-full mt-1 px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-300 outline-none"
    >
      <option value="">Select</option>
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  </div>
);

export default EditProfile;
