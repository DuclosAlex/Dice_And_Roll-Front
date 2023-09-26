import { useAppSelector } from "@/redux/hooks";
import {  GameList, Game } from "@/interfaces/GameInterface/game.interface";
import { useState } from "react";

const GameDisplay: React.FC = () => {

    const userState = useAppSelector((state) => state.userSlice);
    const [ games, setGames] = useState<GameList>(userState.user[0].games)
    console.log(games)

    return (
        <div className="bg-blue-700 rounded-md  w-full p-4 text-white">
            <h3 className="text-center text-3xl font-extrabold mb-4">Vos parties en cours</h3>
            <div>
                <ul className="flex text-2xl border-b-4 font-semibold border-white justify-around">
                    <li className="p-2 w-1/3">Nom de la partie</li>
                    <li className="p-2 w-1/3">Status</li>
                    <li className="p-2 w-1/3">Détails</li>
                </ul>
                { games.map((game: Game, index: number) => {

                    return (
                        <ul className={`flex text-xl justify-around ${index % 2 === 0 ? "bg-blue-400" : ""}`}>
                            <li className="w-1/3 p-2">{game.pseudo}</li>
                            <li className="w-1/3 p-2">{game.status}</li>
                            <li className="w-1/3 p-2">
                                <p>MJ : { game.pseudo === userState.user[0].pseudo ? "Vous" : game.pseudo }</p>
                                <p>Joueurs max : {game.max_players }</p>
                                <p>Histoire : { game.description }</p>
                                <div className="w-1/2 m-auto">
                                    <button className="bg-red-500 p-2 rounded-lg mt-2">Rejoindre</button>
                                </div>
                            </li>
                        </ul>
                    )
                })}
            </div>
        </div>
    )
}

export default GameDisplay;