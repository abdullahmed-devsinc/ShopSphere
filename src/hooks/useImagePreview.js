import { useEffect, useState } from "react";

export function useImagePreview(file) {
    const [previewUrl, setPreviewUrl] = useState("");

    useEffect(() => {
        if (!file) {
            setPreviewUrl("");
            return undefined;
        }

        const url = URL.createObjectURL(file);
        setPreviewUrl(url);

        return () => URL.revokeObjectURL(url);
    }, [file]);

    return previewUrl;
}