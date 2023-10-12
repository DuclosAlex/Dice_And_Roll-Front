'use client'
import { useSearchParams } from "next/navigation";
import { Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Character } from "@/interfaces/CharacterInterface/character.interface";
import instance from "@/config/axios/axios";
import SkillsDisplay from "./components/skillsDisplay";

export default function CharacterPage() {

    //TODO: ADD some event to say to the user that the stats are changed

    const searchParams = useSearchParams();

    const characterId = searchParams.get('characterId');
    const [ character, setCharacter ] = useState<Character | null>(null);
    const [ isSubmit, setIsSubmit ] = useState(false)

    const [ formValues, setFormValues ] = useState({
        strength: 0,
        constitution: 0,
        wisdom: 0,
        charisma: 0,
        intelligence: 0,
        dexterity: 0,
    });

    const fetchCharacterData = async (characterId: any) => {
        try {
            const characterData = await instance.get(`/character/getById?id=${characterId}`);
            setCharacter(characterData.data.characterData);

            if(characterData.data.characterData) {
                const initialStats = characterData.data.characterData.stats[0];
                setFormValues({
                    strength: initialStats.strength,
                    constitution: initialStats.constitution,
                    wisdom: initialStats.wisdom,
                    charisma: initialStats.charisma,
                    intelligence: initialStats.intelligence,
                    dexterity: initialStats.dexterity,
                })
            }

        } catch(error) {
            console.log("erreur de fetch", error)
        }
    }

    useEffect(() => {
        fetchCharacterData(characterId);
    }, [characterId]);


    return (
        <div>
            {character ? (
                <div className="border-2 border-grey-400 w-2/3 m-auto pb-4 bg-blue-300 pt-4">
                    <h2 className="text-center text-4xl font-extrabold underline mb-8">{character.name}</h2>
                    <Formik
                        initialValues={formValues}
                        onSubmit={async (values, actions) => {
                            try {
                                await instance.put(`/stats/update/${characterId}`, values);

                                actions.resetForm({ values: { ...values}})
                                setIsSubmit(false)
                            } catch(error) {
                                console.log(error)
                            }
                        }}
                    >
                        {({errors, touched, setFieldValue}) => {
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
                                                    onChange={(e: any) => {
                                                        if(isSubmit === false) {
                                                            setIsSubmit(true)
                                                        }
                                                        const newValue = e.target.value;
                                                        setFieldValue("strength", newValue);
                                                    }}
                                                    />
                                            </div>
                                        </div>
                                        <div className="w-4/5 flex justify-around p-4">
                                            <label className="w-1/5">Dextérité</label>
                                            <Field      
                                                type="number"
                                                name="dexterity"
                                                className="w-12 text-center"
                                                onChange={(e: any) => {
                                                    if(isSubmit === false) {
                                                        setIsSubmit(true)
                                                    }
                                                    const newValue = e.target.value;
                                                    setFieldValue("dexterity", newValue);
                                                }}
                                            />
                                        </div>
                                        <div className="w-4/5 flex justify-around p-4">
                                            <label className="w-1/5">Vitalité</label>
                                            <Field      
                                                type="number"
                                                name="constitution"
                                                className="w-12 text-center"
                                                onChange={(e: any) => {
                                                    if(isSubmit === false) {
                                                        setIsSubmit(true)
                                                    }
                                                    const newValue = e.target.value;
                                                    setFieldValue("constitution", newValue);
                                                }}
                                            />
                                        </div>
                                        <div className="w-4/5 flex justify-around p-4">
                                            <label className="w-1/5">Sagesse</label>
                                            <Field      
                                                type="number"
                                                name="wisdom"
                                                className="w-12 text-center"
                                                onChange={(e: any) => {
                                                    if(isSubmit === false) {
                                                        setIsSubmit(true)
                                                    }
                                                    const newValue = e.target.value;
                                                    setFieldValue("wisdom", newValue);
                                                }}
                                            />
                                        </div>
                                        <div className="w-4/5 flex justify-around p-4">
                                            <label className="w-1/5">Intelligence</label>
                                            <Field      
                                                type="number"
                                                name="intelligence"
                                                className="w-12 text-center"
                                                onChange={(e: any) => {
                                                    if(isSubmit === false) {
                                                        setIsSubmit(true)
                                                    }
                                                    const newValue = e.target.value;
                                                    setFieldValue("intelligence", newValue);
                                                }}
                                            />
                                        </div>
                                        <div className="w-4/5 flex justify-around p-4">
                                            <label className="w-1/5">Charisme</label>
                                            <Field      
                                                type="number"
                                                name="charisma"
                                                className="w-12 text-center"
                                                onChange={(e: any) => {
                                                    if(isSubmit === false) {
                                                        setIsSubmit(true)
                                                    }
                                                    const newValue = e.target.value;
                                                    setFieldValue("charisma", newValue);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <button 
                                        type="submit"
                                        className={`p-3 font-bold text-white rounded-md m-auto mt-4
                                            ${isSubmit ? "bg-blue-600" : "bg-gray-300" }`}
                                        disabled={!isSubmit}
                                    >
                                        Validez les changements
                                    </button>
                                </Form>
                            )
                        }}
                    </Formik>

                    <SkillsDisplay skills={character.skills} characterId={characterId}/>
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