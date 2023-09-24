import { Character } from "@/interfaces/CharacterInterface/character.interface";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";


const CharacterDisplay: React.FC = () => {

    const userState = useAppSelector((state) => state.userSlice);
    const [ characters, setCharacter ] = useState(userState.user[0].characters);


    return (
        <div className="border-4 border-red-400 p-4 w-5/12">
            <h3>Vos personnages</h3>
            <ul>
                { characters.map((character: Character) => {
                    return (
                        <li>
                            <h3>{character.name}</h3>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default CharacterDisplay;