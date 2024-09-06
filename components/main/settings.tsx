import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";

export default function Settings() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between">
        <h1 className="text-2xl">Preferences</h1>
        <button className="px-4 py-2 bg-violet-500 rounded-lg">Save</button>
      </div>
      <div className="w-full flex justify-center h-full">
        <div className="mt-4 text-gray-300 flex flex-col p-4 border border-gray-800 rounded-xl w-1/2">
          <div
            id="job-search"
            className="flex items-center justify-between border-b border-gray-900 p-4"
          >
            <h1>Job Search</h1>
            <input
              className="rounded-lg bg-gray-900 border border-gray-800 p-1 px-2 text-xs w-1/2 outline-none placeholder:text-gray-500"
              placeholder="Frontend Software Engineer"
            />
          </div>

          <div
            id="experience"
            className="flex items-center justify-between border-b border-gray-900 p-4"
          >
            <h1>Experience</h1>
            <Select>
              <SelectTrigger className="w-1/2 py-1 px-2 text-xs border border-gray-800 text-gray-500">
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="internship">Internship</SelectItem>
                <SelectItem value="entrylevel">Entry Level</SelectItem>
                <SelectItem value="associate">Associate</SelectItem>
                <SelectItem value="midsenior">Mid-Senior Level</SelectItem>
                <SelectItem value="director">Director</SelectItem>
                <SelectItem value="executive">Executive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div
            id="salary"
            className="flex items-center justify-between border-b border-gray-900 p-4"
          >
            <h1>Salary Requirements</h1>
            <Select>
              <SelectTrigger className="w-1/2 py-1 px-2 text-xs border border-gray-800 text-gray-500">
                <SelectValue placeholder="Salary" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="60">$60,000+</SelectItem>
                <SelectItem value="80">$80,000+</SelectItem>
                <SelectItem value="100">$100,000+</SelectItem>
                <SelectItem value="120">$120,000+</SelectItem>
                <SelectItem value="140">$140,000+</SelectItem>
                <SelectItem value="160">$160,000+</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div
            id="job-type"
            className="flex items-center justify-between border-b border-gray-900 p-4"
          >
            <h1>Job Type</h1>
            <Select>
              <SelectTrigger className="w-1/2 py-1 px-2 text-xs border border-gray-800 text-gray-500">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Full-Time</SelectItem>
                <SelectItem value="part">Part-Time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="temp">Temporary</SelectItem>
                <SelectItem value="volunteer">Volunteer</SelectItem>
                <SelectItem value="intern">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div
            id="remote-only"
            className="flex items-center justify-between border-b border-gray-900 p-4"
          >
            <h1>Remote Only</h1>
            <Switch />
          </div>
          <div
            id="recent"
            className="flex items-center justify-between border-b border-gray-900 p-4"
          >
            <h1>Recently Posted</h1>
            <Switch />
          </div>
        </div>
      </div>
    </div>
  );
}
