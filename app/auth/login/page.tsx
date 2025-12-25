import LoginForm from "../components/LoginForm";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1B0918]">
      <div className="w-[90%] sm:w-110 p-6 sm:p-8 bg-[#B6B5FF] rounded-2xl shadow-xl">
        <div className="space-y-2 p-5">
          <h1 className="text-2xl font-black">
            Jerseyपसल
          </h1>
          <p className="mt-1 font-bold text-3xl text-[#161499]">Log in</p>
          <div>
            <LoginForm/>
          </div>
        </div>
      </div>
    </div>
  );
}
