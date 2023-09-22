import { Character } from "../CharacterInterface/character.interface";
import { Game } from "../GameInterface/game.interface";

export interface User {
    id: number;
    pseudo: string;
    email: string;
    is_admin: boolean;
    characters: Character[];
    games: Game[];
}