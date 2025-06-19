import React from "react";

const layers = [
    {
        id: "bottom",
        paths: [
            "M40,150 Q70,130 100,150 Q130,130 160,150",
            "M40,120 Q70,100 100,120 Q130,100 160,120",
        ],
        lineY: [150, 120],
        delay: "animate-delay-[0ms] stroke-blue-700",
    },
    {
        id: "middle",
        paths: [
            "M40,120 Q70,100 100,120 Q130,100 160,120",
            "M40,90 Q70,70 100,90 Q130,70 160,90",
        ],
        lineY: [120, 90],
        delay: "animate-delay-[300ms]",
    },
    {
        id: "top",
        paths: [
            "M40,90 Q70,70 100,90 Q130,70 160,90",
            "M40,60 Q70,40 100,60 Q130,40 160,60",
        ],
        lineY: [90, 60],
        delay: "animate-delay-[600ms] stroke-blue-400",
    },
];

interface BookStackLogoProps {
    className?: string;
}

const BookStackLogo: React.FC<BookStackLogoProps> = ({ className = "" }) => {
    return (
        <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className={`stroke-blue-500 fill-none stroke-2 mx-auto ${className}`}
        >
            {layers.map(({ id, paths, lineY, delay }) => (
                <g
                    key={id}
                    className={delay}
                >
                    <path d={paths[0]} />
                    <line x1="100" y1={lineY[0]} x2="100" y2={lineY[1]} />
                    <path d={paths[1]} />
                </g>
            ))}
        </svg>
    );
};

export default BookStackLogo;
