import { useState } from "react";
const apiUrl = import.meta.env.VITE_CLOUDINARY_LINK;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

export function useCloudinaryUpload() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const uploadImage = async (file) => {
        try {
            setLoading(true);
            setError(null);

            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", uploadPreset);
            const res = await fetch(
                apiUrl,
                {
                    method: "POST",
                    body: formData
                }
            );
            const data = await res.json();
            return data.secure_url;
        }
        catch (err) {
            setError(err)
            throw err;
        }
        finally {
            setLoading(false);
        }
    }
    return { uploadImage, loading, error }
}
