import { IconType } from 'react-icons';


type Props =  {
    icono: IconType
    titulo: string
    handleMatriculaModalidad: () => void;
}

const IcoAprobado = () => {
    return (
        <i className="bi bi-check-square-fill text-xl text-green-500"></i>
    )
}


const AccordionItem = (props: Props) => {



    return (
        <>
            <div className="border border-gray-300 rounded-lg shadow-md p-3 m-4 flex justify-between  hover:scale-105 transition-transform duration-300 mb-2">

                <div>

                    <h3 className="text-lg font-semibold "><IcoAprobado /> {props.titulo}</h3>

                </div>
                <div className="text-green-600">

                    <button 
                    className="block mt-0 text-sm text-white bg-blue-600 border border-blue-600 rounded-4xl py-2 px-4 text-center hover:bg-blue-700"
                    onClick={()=>props.handleMatriculaModalidad()}>
                        Matricularme
                    </button>
                </div>

            </div>
        </>

    );
};

export default AccordionItem;
