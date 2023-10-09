'use client'
import { useSearchParams } from "next/navigation";
import { Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Character } from "@/interfaces/CharacterInterface/character.interface";
import instance from "@/config/axios/axios";

export default function CharacterPage() {

    const searchParams = useSearchParams();

    const characterId = searchParams.get('characterId');
    const [ character, setCharacter ] = useState<Character | null>(null);

    const fetchCharacterData = async (characterId: any) => {
        try {
            const characterData = await instance.get(`/character/getById?id=${characterId}`);
            setCharacter(characterData.data.characterData);

        } catch(error) {
            console.log("erreur de fetch", error)
        }
    }

    const onSubmit = async (values: any) => {

        try {
            console.log('hello', values)
            await instance.post(`/stats/update/${characterId}`, values)
        } catch(error: any) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCharacterData(characterId);
    }, [characterId]);

    useEffect(() => {
        console.log(character);
    }, [character])


    return (
        <div>
            {character ? (
                <div className="border-2 border-grey-400 w-2/3 m-auto pb-4 bg-blue-300 pt-4">
                    <h2 className="text-center text-4xl font-extrabold underline mb-8">{character.name}</h2>
                    <Formik
                        initialValues={{
                            strength: character.stats[0].strength,
                            constitution: character.stats[0].constitution,
                            wisdom: character.stats[0].wisdom,
                            charisma: character.stats[0].charisma,
                            intelligence: character.stats[0].intelligence,
                            dexterity: character.stats[0].dexterity,
                        }}
                        onSubmit={onSubmit}
                    >
                        {({errors, touched}) => {
                            return (
                                <Form className="flex flex-col">
                                    <div className="border-grey-200 border-2 w-4/5 m-auto p-2">
                                        <h3 className="text-center text-3xl font-bold mb-4">Stats</h3>
                                            
                                        <div className="w-4/5 flex justify-around p-4">
                                            <label className="w-1/5">Force</label>
                                            <div>
                                                <Field      
                                                    type="number"
                                                    name="strength"
                                                    className="w-12 text-center"
                                                    />
                                            </div>
                                        </div>
                                        <div className="w-4/5 flex justify-around p-4">
                                            <label className="w-1/5">Dextérité</label>
                                            <Field      
                                                type="number"
                                                name="dexterity"
                                                className="w-12 text-center"
                                            />
                                        </div>
                                        <div className="w-4/5 flex justify-around p-4">
                                            <label className="w-1/5">Vitalité</label>
                                            <Field      
                                                type="number"
                                                name="constitution"
                                                className="w-12 text-center"
                                            />
                                        </div>
                                        <div className="w-4/5 flex justify-around p-4">
                                            <label className="w-1/5">Sagesse</label>
                                            <Field      
                                                type="number"
                                                name="wisdom"
                                                className="w-12 text-center"
                                            />
                                        </div>
                                        <div className="w-4/5 flex justify-around p-4">
                                            <label className="w-1/5">Intelligence</label>
                                            <Field      
                                                type="number"
                                                name="intelligence"
                                                className="w-12 text-center"
                                            />
                                        </div>
                                        <div className="w-4/5 flex justify-around p-4">
                                            <label className="w-1/5">Charisme</label>
                                            <Field      
                                                type="number"
                                                name="charisma"
                                                className="w-12 text-center"
                                            />
                                        </div>
                                    </div>

                                    <button type="submit" className="bg-blue-600 p-3 font-bold text-white rounded-md m-auto mt-4">Validez les changements</button>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            ) : (
                <div>
                    {characterId ? (
                        <p>Chargement en cours !!!</p>
                    ) : (
                        <p>Aucun personnage sélectionné...</p>
                    )}
                </div>
            )}
        </div>
    )

}