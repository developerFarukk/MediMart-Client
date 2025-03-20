"use client"

import { Star } from "lucide-react";

interface StarRatingProps {
    rating: number;
    onRatingChange: (rating: number) => void;
}

const StarRating = ({ rating, onRatingChange }: StarRatingProps) => {

    const starColors = {
        1: "bg-yellow-50",
        2: "bg-yellow-200",
        3: "bg-yellow-300",
        4: "bg-yellow-400",
        5: "bg-yellow-500",
    } as any;

    return (
        <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`cursor-pointer ${star <= rating ? starColors[star] : "bg-gray-300"
                        } rounded-full`}
                    onClick={() => onRatingChange(star)}
                />
            ))}
        </div>
    );
};

export default StarRating; 