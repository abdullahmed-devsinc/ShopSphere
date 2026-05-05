/** Average star rating from customer reviews (not stored on product). */
export function getAverageRating(product) {
    const reviews = product?.reviews;
    if (!Array.isArray(reviews) || reviews.length === 0) return null;
    const sum = reviews.reduce((acc, r) => acc + Number(r?.rating ?? 0), 0);
    return Math.round((sum / reviews.length) * 10) / 10;
}
