import CharacterDisplay from "./CharacterDisplay/CharacterDisplay";
import GameDisplay from "./GameDisplay/GameDisplay";

const GameAndCharacterContainer: React.FC = () => {

    
    return (
        <div className="flex w-full p-4 justify-around">
            <div className="border-r-2 border-gray-300 w-5/12"> 
                <GameDisplay />
            </div>
            <CharacterDisplay />
        </div>
    )
}

export default GameAndCharacterContainer;