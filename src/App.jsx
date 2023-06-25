import { useState, useEffect } from "react";
import "./App.css";
import Loading from "./Loading";

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const resp = await fetch(
          `https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_API}`
        );
        const data = await resp.json();
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 2000);
        });
        setGames(data.results);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);
  useEffect(() => {
    console.log(games);
  }, [games]);

  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className="font-bold mb-6 text-2xl">Popular Video Games</h1>
      {games.map((game) => {
        return (
          <div
            key={game.id}
            className=" flex flex-col border border-gray-100 mb-8 rounded rounded-lg  w-[90%] max-w-[700px] max-h-[400px] overflow-hidden shadow-lg"
          >
            <p className="text-left text-xl  m-2 font-bold min-h-[40px]">
              {game.slug.charAt(0).toUpperCase() + game.slug.slice(1)}
            </p>
            <p className="text-left text-lg m-2 -mt-2 min-h-[30px]">
              Rating : {game.rating}
            </p>
            <img
              src={game.background_image}
              alt={game.slug}
              className="h-[350px] object-cover w-[100%]"
            />
          </div>
        );
      })}
    </div>
  );
}

export default App;
