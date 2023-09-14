import { Avatar } from "./Avatar";

export const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-200 border-b border-gray-300">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="flex items-center">
        {/* menu buttons */}
        <Avatar />
        {/* Placeholder for user avatar */}
      </div>
    </div>
  );
};
