function LinkOutIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M10 14L14 10M17 7a5 5 0 00-7.07 0L7 10.93a5 5 0 007.07 7.07l1.86-1.86m3.54-7.07l-1.86 1.86" />
    </svg>
  );
}

export default LinkOutIcon;
