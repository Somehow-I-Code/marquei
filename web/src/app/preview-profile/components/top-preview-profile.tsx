export default function TopPreviewProfile() {
    return (
        <div className="flex justify-center items-center bg-indigo-950 h-24">
            <div className="relative">
                <div className="mt-24 w-28 h-28 rounded-full flex items-center justify-center overflow-hidden">
                    <svg
                        width="126"
                        height="126"
                        viewBox="0 0 126 126"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g filter="url(#filter0_d_618_85)">
                            <circle cx="63" cy="59" r="59" fill="white" />
                        </g>
                        <circle
                            cx="63.7928"
                            cy="57.4498"
                            r="22.1121"
                            fill="#E1920C"
                        />
                        <path
                            d="M96.302 103.139C96.302 105.189 79.0825 114.561 64.5249 114.561C49.9673 114.561 30.6978 106.214 30.6978 103.139C30.6978 90.9263 44.6094 74.876 64.5249 74.876C84.4405 74.876 96.302 93.62 96.302 103.139Z"
                            fill="#E1920C"
                        />
                        <circle
                            cx="63.5"
                            cy="59.5"
                            r="54"
                            stroke="#E1920C"
                            stroke-width="3"
                        />
                        <defs>
                            <filter
                                id="filter0_d_618_85"
                                x="0"
                                y="0"
                                width="126"
                                height="126"
                                filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB"
                            >
                                <feFlood
                                    flood-opacity="0"
                                    result="BackgroundImageFix"
                                />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feOffset dy="4" />
                                <feGaussianBlur stdDeviation="2" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                />
                                <feBlend
                                    mode="normal"
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_618_85"
                                />
                                <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="effect1_dropShadow_618_85"
                                    result="shape"
                                />
                            </filter>
                        </defs>
                    </svg>
                </div>
            </div>
        </div>
    );
}
