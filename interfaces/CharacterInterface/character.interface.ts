import { Skills } from "../SkillsInterface/skills.interface";
import { Stats } from "../StatsInterface/Stats.interface";

export interface Character {
    id: number;
    name: string;
    race: string;
    class: string;
    background: string;
    user_id: number;
    game_id: number;
    is_alive: boolean;
    stats: Stats[];
    skills: Skills[];
}