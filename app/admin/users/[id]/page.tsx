async function getUser(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`,
    { cache: "no-store" },
  );

  if (!res.ok) throw new Error("User not found");

  return res.json();
}

export default async function UserDetails({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUser(params.id);

  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-xl">
      <h2 className="text-xl font-semibold mb-4">User Details</h2>

      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Status: {user.status}</p>
    </div>
  );
}
