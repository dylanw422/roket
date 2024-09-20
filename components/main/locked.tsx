import Image from "next/image";
import { ArrowRight } from "../icons/arrowRight";
export default function Locked({ setProductKeyVerified }: any) {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-neutral-100 dark:bg-gray-950">
      <Image width={100} height={100} alt="" src="./roketLogo.svg" />
      <div className="flex h-8 my-12">
        <input
          className="bg-neutral-200 dark:bg-gray-900 border border-neutral-300 dark:border-gray-800 rounded-lg py-1 px-3 outline-none placeholder:text-sm text-gray-800 dark:text-neutral-200"
          placeholder="PRODUCT KEY"
        />
        <button onClick={() => setProductKeyVerified(true)}>
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}
