import Header from "@/app/components/Header";
import Link from "next/link";
function page() {
  return (
    <div className="h-screen">
      <Header title="Welcome back!" extra="Choose an option" />
      <div className="flex flex-col gap-4 h-[93vh] justify-center items-center  rounded-2xl">
        <div>
          <h1 className="font-bold text-2xl text-white "> Some intresting things happened this morining!</h1>
        </div>
        <Link href="/pages/assistence">
          <div className="">
            <button className="bg-blue-600 text-white w-[20rem] p-4 rounded-lg hover:bg-indigo-950 hover:text-purple shadow-lg hover:bg-blue-700">
              Assitence
            </button>
          </div>
        </Link>
        <Link href="/pages/reports">
          <div className="">
            <button className="bg-blue-600 text-white w-[20rem] p-4 rounded-lg hover:bg-indigo-950 hover:text-blue shadow-lg hover:bg-blue-700 ">
              Reports
            </button>
          </div>
        </Link>
        <Link href="/pages/incident">
          <div>
            <button className="bg-blue-600 text-white w-[20rem] p-4 rounded-lg hover:bg-indigo-950 hover:text-green shadow-lg hover:bg-blue-700">
              Incident
            </button>
          </div>
        </Link>
        <Link href="/pages/graphs">
          <div>
            <button className="bg-blue-600 text-white w-[20rem] p-4 rounded-lg hover:bg-indigo-950 hover:text-pink shadow-lg hover:bg-blue-700">
              Graphs
            </button>
          </div>
        </Link>
        <Link href="/pages/config">
          <div>
            <button className="bg-blue-600 text-white w-[20rem] p-4 rounded-lg hover:bg-indigo-950 hover:text-yellow shadow-lg hover:bg-blue-700">
              Account
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default page;
