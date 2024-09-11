import Image from "next/image";
export default function Locked({ setProductKeyVerified }: any) {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-950">
      <Image width={100} height={100} alt="" src="./roketLogo.svg" />
      <div className="flex h-8 my-12">
        <input
          className="bg-gray-900 rounded-lg border border-gray-800 py-1 px-3 outline-none placeholder:text-sm text-white"
          placeholder="PRODUCT KEY"
        />
        <button onClick={() => setProductKeyVerified(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right w-12 p-1 text-white ml-2 rounded-lg border border-gray-800 bg-violet-500 h-full"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l14 0" />
            <path d="M15 16l4 -4" />
            <path d="M15 8l4 4" />
          </svg>
        </button>
      </div>
    </div>
  );
}
