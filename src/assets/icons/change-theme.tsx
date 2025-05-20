function ChangeTheme(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 24 24"
      fill="#000000"
      {...props}
    >
      <path d="M4 6a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2H4V6zm16-4H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-5 14H8V9h7v7zm5 0h-3V9h3v7zm0-9H8V4h12v3z"></path>
    </svg>
  );
}

export default ChangeTheme;
