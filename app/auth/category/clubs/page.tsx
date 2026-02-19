import JerseyCard from "../../components/JerseyCard";

export default function Page() {
  const clubs = [
    { id: 1, name: "Real Madrid", image: "/images/real-madrid.png" },
    { id: 2, name: "Manchester United", image: "/images/manutd.png" },
    { id: 3, name: "Barcelona", image: "/images/barcelona.png" },
    { id: 4, name: "Bayern Munich", image: "/images/bayern.png" },
  ];

  return (
    <section className="bg-gray-950 min-h-screen text-white py-14">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-10">🏟 Club Jerseys</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {clubs.map((club) => (
            <JerseyCard key={club.id} {...club} type="club" />
          ))}
        </div>
      </div>
    </section>
  );
}
