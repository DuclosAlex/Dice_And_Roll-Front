import { Character } from "@/interfaces/CharacterInterface/character.interface";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { useState } from "react";

const CharacterDisplay: React.FC = () => {

    const userState = useAppSelector((state) => state.userSlice);
    const [ characters, setCharacter ] = useState(userState.user[0].characters);

    return (
        <div className=" p-4 w-5/12 text-white bg-emerald-500 rounded-md">
            <h3 className="text-center text-3xl font-extrabold mb-4">Vos personnages</h3>
            <ul className="flex text-2xl border-b-4 font-semibold border-white justify-around">
                <li className="p-2 w-1/2">Nom du personnage</li>
                <li className="p-2 w-1/2">Détails</li>
            </ul>
            { characters.map((character: Character, index: number) => {

                return (
                    <ul key={character.id} className={`flex text-xl justify-around ${index % 2 === 0 ? "bg-emerald-400" : ""}`}>
                        <li className="w-1/2 p-2"><p className="text-2xl">{character.name}</p></li>
                        <li className="w-1/2 p-2 flex flex-col">
                            <p>Classe : {character.class }</p>
                            <p>Race : { character.race }</p>
                            <p>Status : { character.is_alive ? "Vivant" : "Mort" }</p>
                            <div  className="w-full ">
                                <Link href={{
                                    pathname: `/menu/character/${encodeURIComponent(character.name)}`,
                                    query: {characterId: character.id}
                                }} className="bg-red-500 p-2 rounded-lg mt-2">Gérer</Link>
                            </div>
                        </li>
                    </ul>
                )
            })}
        </div>
    )
}

export default CharacterDisplay;