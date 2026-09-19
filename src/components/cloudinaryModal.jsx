import { useState } from "react";

export default function CloudinaryModal({ onClose, onUpload }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  async function uploadImage() {
    if (!file) return;

    setLoading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "blog-image-upload"); // 🔥 REQUIRED

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dhfelcnj5/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    console.log(res)

    const result = await res.json();

    setLoading(false);

    if (result.secure_url) {
      onUpload(result.secure_url); // ✅ THIS is what your AdminPage expects
      onClose();
    } else {
      alert("Upload failed");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-3">Upload Image</h2>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <div className="flex gap-2 mt-4">
          <button
            onClick={uploadImage}
            disabled={loading}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>

          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-3 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}