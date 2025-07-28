import React, { useEffect, useState } from "react";

interface Review {
  _id?: string;
  user: { name: string; avatar?: string };
  rating: number;
  text: string;
  photos: string[];
  createdAt: string;
}

export default function ReviewsSection({ gardenId, user }: { gardenId: string; user: any }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/reviews?gardenId=${gardenId}`)
      .then(res => res.json())
      .then(setReviews);
  }, [gardenId]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setPhotos(Array.from(e.target.files));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Convert photos to base64
    const photoPromises = photos.map(file =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      })
    );
    const photoData = await Promise.all(photoPromises);

    const review = {
      user: { name: user?.name, email: user?.email, avatar: user?.image },
      gardenId,
      rating,
      text,
      photos: photoData,
    };

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });
    if (res.ok) {
      setText("");
      setPhotos([]);
      setRating(5);
      // Refresh reviews
      fetch(`/api/reviews?gardenId=${gardenId}`)
        .then(res => res.json())
        .then(setReviews);
    }
    setSubmitting(false);
  };

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Reviews & Gallery</h2>
      <div className="mb-8">
        {user ? (
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
            <div>
              <label className="block font-medium">Your Rating:</label>
              <select value={rating} onChange={e => setRating(Number(e.target.value))} className="border rounded p-1">
                {[5,4,3,2,1].map(n => (
                  <option key={n} value={n}>{n} Star{n > 1 && "s"}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium">Your Review:</label>
              <textarea value={text} onChange={e => setText(e.target.value)} className="border rounded w-full p-2" rows={3} required />
            </div>
            <div>
              <label className="block font-medium">Upload Photos:</label>
              <input type="file" accept="image/*" multiple onChange={handlePhotoChange} />
            </div>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        ) : (
          <div className="text-gray-600">Please log in to leave a review.</div>
        )}
      </div>
      <div className="space-y-6">
        {reviews.length === 0 && <div className="text-gray-500">No reviews yet. Be the first to review!</div>}
        {reviews.map(r => (
          <div key={r._id} className="bg-white rounded shadow p-4">
            <div className="flex items-center mb-2">
              {r.user.avatar && <img src={r.user.avatar} alt="" className="w-8 h-8 rounded-full mr-2" />}
              <span className="font-semibold">{r.user.name}</span>
              <span className="ml-4 text-yellow-500">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
              <span className="ml-auto text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="mb-2">{r.text}</div>
            {r.photos && r.photos.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {r.photos.map((photo, i) => (
                  <img key={i} src={photo} alt="Review" className="w-24 h-24 object-cover rounded" />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
} 