function Envelop(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 512 512"
      {...props}
    >
      <path d="M 48 64 Q 28 65 14 78 L 14 78 L 14 78 Q 1 92 0 112 Q 1 136 19 150 L 237 314 L 237 314 Q 256 326 275 314 L 493 150 L 493 150 Q 511 136 512 112 Q 511 92 498 78 Q 484 65 464 64 L 48 64 L 48 64 Z M 0 176 L 0 384 L 0 176 L 0 384 Q 1 411 19 429 Q 37 447 64 448 L 448 448 L 448 448 Q 475 447 493 429 Q 511 411 512 384 L 512 176 L 512 176 L 294 339 L 294 339 Q 277 352 256 352 Q 235 352 218 339 L 0 176 L 0 176 Z" />
    </svg>
  );
}

export default Envelop;
