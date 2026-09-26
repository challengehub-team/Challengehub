import { useEffect, useState, useRef } from "react";
import { FiEdit2, FiTrash2, FiUser, FiMail, FiPhone, FiShield, FiLoader } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// ⚠️ REPLACE THESE CONSTANTS WITH YOUR ACTUAL CLOUDINARY DETAILS
/* const CLOUDINARY_CLOUD_NAME = ""; */
const CLOUDINARY_UPLOAD_PRESET = "blog-image-upload";

export default function ProfilePage() {

  const [user, setUser] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const getToken = async () => {
    return localStorage.getItem("token");

   /*  console.log(localStorage.getItem("token")) */
  };

  const fetchUser = async () => {
    try {
      const token = await getToken();

      const res = await fetch("https://challengehub-backend-o6ok.onrender.com/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log(data);

      setUser({
        ...data,
        name: data.name || data.displayName,
      });

    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handlePencilClick = () => {
    fileInputRef.current.click();
  };

  // 📷 UPLOAD FILE DIRECTLY TO CLOUDINARY, THEN SEND URL STRING TO BACKEND
  const handleFileChange = async (e) => {
    const file = e.target.files[0]; // 👈 FIX: Added [0] to grab the actual file!
    if (!file) return;

    try {
      setUploadingImage(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      // Upload to Cloudinary
      const cloudinaryRes = await fetch(
        `https://api.cloudinary.com/v1_1/dhfelcnj5/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const cloudinaryData = await cloudinaryRes.json();
      if (!cloudinaryRes.ok) throw new Error(cloudinaryData.error?.message || "Cloudinary Upload Failed");

      const uploadedImageUrl = cloudinaryData.secure_url;
      const token = await getToken();

      // Send to your backend
      const res = await fetch("http://localhost:3000/api/auth/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ profilePic: uploadedImageUrl }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Backend database update failed");

      fetchUser();
    } catch (err) {
      toast.error(
        err.message,
        {
          style: {
            background: "#fff",
            color: "#111",
            borderLeft: "5px solid #ef4444",
          },
        }
      )
    } {
      setUploadingImage(false);
    }
  };


  const openEdit = (field) => {
    setEditingField(field);
    setDraft(user?.[field] ?? "");
  };

  const cancelEdit = () => {
    setEditingField(null);
    setDraft("");
  };

  const saveEdit = async () => {
    try {
      if (!draft.trim())
        return toast.error(
          "Field cannot be empty",
          {
            style: {
              background: "#fff",
              color: "#111",
              borderLeft: "5px solid #ef4444",
            },
          }
        )

      setSaving(true);
      const token = await getToken();

      let payload = {};
      if (editingField === "surname") payload.surname = draft;
      else if (editingField === "otherNames") payload.otherNames = draft;
      else if (editingField === "email") payload.email = draft;
      else if (editingField === "phone") payload.phone = draft;
      else if (editingField === "lga") payload.lga = draft;
      else if (editingField === "school") payload.school = draft;
      else if (editingField === "state") payload.state = draft;
      else if (editingField === "category") payload.category = draft;

      const res = await fetch("http://localhost:3000/api/auth/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      fetchUser();

      if (!res.ok) {
        return toast.error(
          "Update failed",
          {
            style: {
              background: "#fff",
              color: "#111",
              borderLeft: "5px solid #ef4444",
            },
          }
        )
      }

      /* throw new Error(data.error || "Update failed"); */

      setUser((prev) => ({
        ...prev,
        [editingField]: draft,
      }));

      setEditingField(null);
      setDraft("");

    } catch (err) {
      toast.error(
        err.message,
        {
          style: {
            background: "#fff",
            color: "#111",
            borderLeft: "5px solid #ef4444",
          },
        }
      )
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    try {
      const token = await getToken();

      const res = await fetch("http://localhost:3000/api/auth/delete", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error();
      navigate("/login");    } catch (err) {
      toast.error(
        "Failed to delete",
        {
          style: {
            background: "#fff",
            color: "#111",
            borderLeft: "5px solid #ef4444",
          },
        }
      )
    }
  };

  const Field = ({ label, field }) => {
    const isEditing = editingField === field;
    const value = user.user?.[field] ?? "";

    return (
      <div className="bg-white border border-green-100 rounded-2xl p-5 mt-12 shadow-sm hover:shadow-lg transition-all duration-300">
        {!isEditing ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase text-green-500 tracking-wider">{label}</p>
              <p className="text-lg font-semibold text-gray-800 mt-1">{value || "—"}</p>
            </div>
            <button
              onClick={() => openEdit(field)}
              className="p-2 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition"
            >
              <FiEdit2 />
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs uppercase text-green-500 tracking-wider">{label}</p>
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="w-full px-4 py-3 border border-green-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={cancelEdit}
                className="px-4 py-2 border border-gray-200 rounded-xl text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                disabled={saving}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
        <div className="text-green-600 font-semibold animate-pulse">Loading profile...</div>
      </div>
    );
  }

  const currentAvatarUrl = user?.user?.profilePic || user?.user?.photoURL;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6 mt-12 flex justify-center">
      <div className="w-full max-w-2xl space-y-6">

        {/* HEADER */}
        <div className="bg-white rounded-3xl shadow-lg border border-green-100 p-6 text-center">

          {/* PICTURE CONTAINER */}
          <div className="relative w-20 h-20 mx-auto group mb-4">
            <div
              onClick={handlePencilClick}
              className="w-full h-full rounded-full bg-green-100 border-2 border-green-600 overflow-hidden flex items-center justify-center text-green-700 text-2xl font-bold cursor-pointer relative shadow-sm"
            >
              {uploadingImage && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white z-10">
                  <FiLoader className="animate-spin text-sm" />
                </div>
              )}

              {currentAvatarUrl ? (
                <img src={currentAvatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                user?.surname?.charAt(0) || "U"
              )}
            </div>

            {/* PENCIL OVERLAY TRIGGER */}
            <button
              type="button"
              onClick={handlePencilClick}
              className="absolute bottom-0 right-0 bg-green-600 hover:bg-green-700 text-white p-1.5 rounded-full border border-white shadow transition flex items-center justify-center"
              title="Change Picture"
            >
              <FiEdit2 className="text-[10px] font-bold" />
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          <h1 className="text-2xl font-bold mt-3 text-gray-800">Profile Settings</h1>
          <p className="text-gray-500 text-sm">Manage your personal information securely</p>
        </div>

        {/* FIELDS */}
        <div className="space-y-4">
          <Field label="Surname" field="surname" />
          <Field label="Other Names" field="otherNames" />
          <Field label="Email Address" field="email" />
          <Field label="LGA" field="lga" />
          <Field label="Phone" field="phone" />
          <Field label="School" field="school" />
          <Field label="State" field="state" />
          <Field label="Role" field="role" />
        </div>

        {/* DELETE SECTION */}
        <div className="bg-white border border-red-200 rounded-3xl p-6 shadow-sm hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 font-bold">Danger Zone</p>
              <p className="text-xs text-gray-500">Once deleted, this action cannot be undone</p>
            </div>
            <FiTrash2 className="text-red-500 text-xl" />
          </div>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-2xl font-semibold transition"
          >
            Delete Account
          </button>
        </div>

        {/* MODAL */}
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">
              <h2 className="text-lg font-bold">Confirm Delete</h2>
              <p className="text-sm text-gray-500 mt-2">This action cannot be undone.</p>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-200 rounded-xl text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold"
                >
                  Delete Permanently
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
