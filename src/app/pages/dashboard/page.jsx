import Header from "@/app/components/Header";
import Link from "next/link";
function page() {
  return (
    <div className="h-screen">
      <Header title="Welcome back!" extra="Choose an option" />
      <div className="flex flex-col gap-4 h-[93vh] justify-center items-center bg-white rounded-2xl">
        <div>
          <h1 className="font-bold text-2xl text-gray-900"> Some intresting things happened this morining!</h1>
        </div>
        <Link href="/pages/assistence">
          <div className="">
            <button className="border w-[20rem] p-4 rounded-lg hover:bg-indigo-950 hover:text-white">
              Assitence
            </button>
          </div>
        </Link>
        <Link href="/pages/reports">
          <div className="">
            <button className="border w-[20rem] p-4 rounded-lg hover:bg-indigo-950 hover:text-white">
              Reports
            </button>
          </div>
        </Link>
        <Link href="/pages/incident">
          <div>
            <button className="border w-[20rem] p-4 rounded-lg hover:bg-indigo-950 hover:text-white">
              Incident
            </button>
          </div>
        </Link>
        <Link href="/pages/graphs">
          <div>
            <button className="border w-[20rem] p-4 rounded-lg hover:bg-indigo-950 hover:text-white">
              Graphs
            </button>
          </div>
        </Link>
        <Link href="/pages/config">
          <div>
            <button className="border w-[20rem] p-4 rounded-lg hover:bg-indigo-950 hover:text-white">
              Account
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default page;
