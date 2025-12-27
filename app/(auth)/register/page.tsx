import RegisterForm from "../components/RegisterForm";

export default function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-black text-[#161499]">
        Jerseyपसल
      </h1>

      <p className="text-3xl font-bold text-[#161499]">
        Sign up
      </p>

      <div>
        <RegisterForm/>
      </div>
    </div>
  );
}
