import instance from "@/config/axios/axios";
import { Skills } from "@/interfaces/SkillsInterface/skills.interface";
import { Formik, Field, Form, ErrorMessage} from 'formik';

interface SkillsDisplayProps {
    skills: Skills[];
}

const SkillsDisplay: React.FC<SkillsDisplayProps> = ({skills})=> {


    const initialValues = {
        name: "",
        description: ","
    }


    return (
        <div className="border-grey-200 border-2 w-4/5 mt-4 m-auto p-2">
            <h3 className="text-center text-3xl font-bold mb-8">Compétences</h3>

            { skills ? (
                skills.map((skill: Skills, index: number) => {

                    return (
                        <div key={index} className="flex justify-around bg-blue-200 w-1/2 m-auto p-4">
                            <h4 className="p-4 text-lg font-bold">{skill.name}</h4>
                            <p className="p-4 text-lg font-bold">{skill.description }</p>
                            <button className="p-4 bg-red-500 rounded-md text-white text-md" type="submit">Supprimer</button>
                        </div>
                    )
                })
            ) : <p className="text-center">Aucune compétence encore !</p>}

            <Formik
                initialValues={initialValues}
                onSubmit={async (values, actions) => {
                    try {
                        const result = await instance.post(`/skills/create`, values);

                        actions.resetForm({values : initialValues})
                    } catch(error) {
                        console.log(error)
                    }
                }}
            
            >
                {({errors, touched}) => {
                    return (
                        <Form className="mt-8 justify-around border-2 border-gray-300 w-4/5 m-auto py-4 flex">
                            <div className="flex flex-col">
                                <div className="flex flex-col w-2/3 mb-4 m-auto">
                                    <label className="text-center mb-2">Nom de la compétence</label>
                                    <Field
                                        type="text"
                                        name="name"
                                        />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label className="text-center mb-2">Description de la compétence</label>
                                    <Field
                                        as="textarea"
                                        name="description"
                                        />
                                </div>
                            </div>

                            <div className="pt-6 flex flex-col justify-center">
                                <p className="text-xl font-bold mb-4">Ajoutez une compétence</p>
                                <button type="submit" className="p-2 bg-red-500 rounded-md text-white text-md w-1/2 mx-auto">+</button>
                            </div>
                            
                        </Form>
                    )
                }}

            </Formik>

        </div>
    )
}

export default SkillsDisplay;