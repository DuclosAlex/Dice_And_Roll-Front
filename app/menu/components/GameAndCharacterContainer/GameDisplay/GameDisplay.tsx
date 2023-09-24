import { useAppSelector } from "@/redux/hooks";
import {  GameList, Game } from "@/interfaces/GameInterface/game.interface";
import { useState } from "react";

const GameDisplay: React.FC = () => {

    const userState = useAppSelector((state) => state.userSlice);
    const [ games, setGames] = useState<GameList>(userState.user[0].games)
    console.log(games)

    return (
        <div className="border-4 border-blue-500 p-6 w-full">
            <h3>Vos parties en cours</h3>
            <table>
                <thead>
                    <tr>
                        <th className="text-xl">Nom de la partie</th>
                        <th className="text-xl">Status</th>
                        <th className="text-xl">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map((games: Game, index: number) => {

                        return (
                            <tr>
                                <td>{games.name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default GameDisplay;