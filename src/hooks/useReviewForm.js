import { useState } from "react";

export function useReviewForm(onSubmitReview) {
    const [author, setAuthor] = useState("");
    const [rating, setRating] = useState(5);
    const [formError, setFormError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!author.trim()) {
            setFormError("Please enter your name.");
            return;
        }

        setFormError("");
        onSubmitReview({ author: author.trim(), rating: Number(rating) });
        setAuthor("");
        setRating(5);
    };

    return {
        author,
        rating,
        formError,
        setAuthor,
        setRating,
        handleSubmit,
    };
}