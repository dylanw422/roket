import { Select, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";

export default function Settings() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between">
        <h1 className="text-2xl">Preferences</h1>
        <button className="px-4 py-2 bg-pink-500 rounded-lg">Save</button>
      </div>
      <div className="w-full flex justify-center h-full">
        <div className="mt-4 text-gray-300 flex flex-col p-4 border border-gray-800 rounded-xl w-1/2">
          <div
            id="job-search"
            className="flex items-center justify-between border-b border-gray-800 p-4"
          >
            <h1>Job Search</h1>
            <input
              className="rounded-lg bg-gray-900 border border-gray-800 p-1 px-2 text-xs w-1/2 outline-none placeholder:text-gray-500"
              placeholder="Frontend Software Engineer"
            />
          </div>
          <div
            id="remote-only"
            className="flex items-center justify-between border-b border-gray-800 p-4"
          >
            <h1>Remote Only</h1>
            <Switch />
          </div>
          <div
            id="experience"
            className="flex items-center justify-between border-b border-gray-800 p-4"
          >
            <h1>Experience</h1>
            <Select>
              <SelectTrigger className="w-1/2 py-1 px-2 text-xs border border-gray-800 text-gray-500">
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
            </Select>
          </div>
          <div
            id="salary"
            className="flex items-center justify-between border-b border-gray-800 p-4"
          >
            <h1>Salary Requirements</h1>
            <Switch />
          </div>
          <div
            id="Job Type"
            className="flex items-center justify-between border-b border-gray-800 p-4"
          >
            <h1>Job Type</h1>
            <Switch />
          </div>
        </div>
      </div>
    </div>
  );
}
