import SensorChart, {
  DhtHumidityGauge,
  MoistureGauge,
} from "@/components/SensorChart";
import { FaThermometerHalf } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { FaLeaf } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import Link from "next/link";


import Image from "next/image";


export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <header className="bg-white rounded-b-lg shadow-md">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          <a className="block text-teal-600" href="#">
            <span className="sr-only">Home</span>
            <Image
              src="/BitLeafGreenLogo.png"
              alt="BitLeaf Logo"
              width={100}
              height={100}
              className="h-auto w-auto"
            />
          </a>

          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a className="text-gray-500 transition hover:text-gray-500/75">
                    {" "}
                    Monitoring Dashboard{" "}
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <Link
                  href="/"
                  className="block rounded-md bg-[#1E6E47] px-5 py-2.5 text-sm font-medium text-white transition hover:brightness-110"
                >
                  <FaArrowsRotate className="w-5 h-5 text-white-500" />
                </Link>
              </div>

              <button className="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
                <span className="sr-only">Toggle menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      <br />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2 rounded-lg border bg-white p-4 shadow transition hover:shadow-md">
          <h2 className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <FaThermometerHalf className="w-5 h-5 text-red-500" />
            DHT Temp (°C)
          </h2>
          <SensorChart metric="dhtTemp" label="DHT Temp" />
        </div>
        <div className="flex flex-col gap-2 rounded-lg border bg-white p-4 shadow transition hover:shadow-md">
          <h2 className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <FaThermometerHalf className="w-5 h-5 text-orange-500" />
            LM35 Temp (°C)
          </h2>
          <SensorChart metric="lm35Temp" label="LM35 Temp" />
        </div>
        <div className="flex flex-col gap-2 rounded-lg border bg-white p-4 shadow transition hover:shadow-md">
          <h2 className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <FaDroplet className="w-5 h-5 text-blue-500" />
            Humidity (%)
          </h2>
          <DhtHumidityGauge />
        </div>
        <div className="flex flex-col gap-2 rounded-lg border bg-white p-4 shadow transition hover:shadow-md">
          <h2 className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <FaLeaf className="w-5 h-5 text-emerald-600" />
            Soil Moisture (%)
          </h2>
          <MoistureGauge />
        </div>
      </div>
    </main>
  );
}
