import Horario from "./component/Horario";
import { useEffect, useState } from "react";
import ModalHorarioDetAgregar from "./modal/HorarioDetAgregar";

import Sweet from '../../../model/interfaces/Sweet.mode.interface'

import Response from "../../../model/class/response.model.class";
import RestError from "../../../model/class/resterror.model.class";
import { Types } from "../../../model/enum/types.model.enum";

import Listas from "../../../model/interfaces/Listas.model.interface";
import { ListarHorarioDetalleId } from "../../../network/rest/idiomas.network";

import ListHorarioDetId from "../../../model/interfaces/horario/listHorarioDetId";
import HorarioPag from "@/model/interfaces/horario/horarioPag";

type Props = {
    idHorario: number
    idIdioma: number,


    itemHorario: HorarioPag | undefined
    sweet: Sweet,

    abortControl: AbortController,
    handleCloseModuloDetalle: () => void
}

const HorarioDetalle = (props: Props) => {

    const [listaHorarioDetalleId, setListaHorarioDetalleId] = useState<ListHorarioDetId[]>([])

    const [dataHorario, setDataHorario] = useState<object[]>([]);
    const [color, setColor] = useState<object[]>([]);

    const [isOpenModal, setIsOpenModal] = useState(false);


    const { itemHorario } = props

    useEffect(() => {
        loadInit(props.idHorario)
    }, [])


    const handleOpenModalHorarioAgregra = () => {
        setIsOpenModal(true)
    }

    const handleCloseModalHorarioAgregra = () => {
        setIsOpenModal(false)
    }

    const loadInit = async (horarioId: number) => {

        setListaHorarioDetalleId([])

        const response = await ListarHorarioDetalleId<Listas>(horarioId, props.abortControl)
        console.log(response)
        if (response instanceof Response) {
            setListaHorarioDetalleId(response.data.resultado as ListHorarioDetId[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }

    }

    useEffect(() => {
        dataRenderHorario()
        dataRenderHorarioColor()
    }, [listaHorarioDetalleId])


    const dataRenderHorario = async () => {

        if (listaHorarioDetalleId.length > 0) {

            setDataHorario(
                listaHorarioDetalleId.map((item) => {

                    // console.log(item)

                    const currentDate = new Date();

                    const startDate = new Date(currentDate);
                    const endDate = new Date(currentDate);

                    const [startHour, startMin] = item.horaIni.split(":");
                    const [endHour, endMin] = item.horaFin.split(":");

                    startDate.setHours(parseInt(startHour), parseInt(startMin), 0, 0);
                    endDate.setHours(parseInt(endHour), parseInt(endMin), 0, 0);

                    return {
                        detHorarioId: item.detHorarioId,
                        asignaturaId: item.asiId,
                        asignatura: item.asignatura,
                        nivel: item.nivel,
                        startDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + item.dia - currentDate.getDay(), parseInt(startHour), parseInt(startMin)),
                        endDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + item.dia - currentDate.getDay(), parseInt(endHour), parseInt(endMin)),
                        horaIni: item.horaIni,
                        horaFin: item.horaFin,
                        horaAcademica: item.horaAcademica,
                        color: item.color,
                        docente: item.docente,
                        seccion: item.seccion,
                        turno: item.turno,
                        tipEstudioId: item.tipEstudioId,
                        tipoEstudio: item.tipoEstudio,
                        // aula: item.aula,
                        observacion: item.observacion,
                        dia: item.dia,
                        recurrenceRule: 'FREQ=WEEKLY',
                        // disponible: item.disponible,
                        modHora: item.fechaModifica,
                        // modalidad: item.modalidad,
                        // ocupado: item.ocupado,
                        capacidad: item.capacidad,
                        docenteId: item.docenteId,

                        //codCursal: item.codCursal,
                        visibleeee: item.estado,

                        roomId: item.color
                    };

                })

            );

        }

    }

    const dataRenderHorarioColor = async () => {
        if (listaHorarioDetalleId.length > 0) {

            setColor(
                listaHorarioDetalleId.map((item) => {
                    return {
                        id: item.color,
                        color: item.color,
                        // text: ""
                    }
                })

            )

        }
    }


    return (
        <>
            <ModalHorarioDetAgregar
                isOpenModal={isOpenModal}
                idHorario={props.idHorario}
                idIdioma={props.idIdioma}
                turnoInicio={itemHorario?.turnoInicio}
                turnoFin={itemHorario?.turnoFin}

                sweet={props.sweet}
                abortControl={props.abortControl}
                handleCloseModalHorarioAgregra={handleCloseModalHorarioAgregra} />


            <div className="p-1 bg-Solid">
                <h2 className="text-2xl font-bold mb-6"><span onClick={props.handleCloseModuloDetalle} title="Atrás" role="button"><i className="bi bi-arrow-left-circle-fill text-blue-500"></i></span> Configuracion de Horario</h2>

                <div className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-1 mb-2">

                        <div className="relative flex flex-wrap justify-between ">
                            <button
                                className="ml-1 flex items-center rounded border-md p-2 text-xs border-green-500 bg-green-500 text-white hover:bg-green-700 focus:ring-2 focus:ring-gray-400 active:ring-gray-400"
                                onClick={handleOpenModalHorarioAgregra}
                            >
                                <i className="bi bi-plus-circle mr-1"></i> AGREGAR ASIGNATURA
                            </button>

                            <button
                                className="ml-1 flex items-center rounded border-md p-2 text-xs border-blue-500 bg-blue-500 text-white hover:bg-blue-700 focus:ring-2 focus:ring-gray-400 active:ring-gray-400"
                                onClick={() => loadInit(props.idHorario)}
                            >
                                <i className="bi bi-arrow-clockwise mr-1"></i> Recargar
                            </button>

                        </div>
                        <div className="text-center ">
                            <span className="text-lg font-semibold text-gray-500">{itemHorario?.idiomaNombre} - {itemHorario?.sede} - {itemHorario?.modalidad} - ( {itemHorario?.anio} - {itemHorario?.mes}) - {itemHorario?.aulaNombre}</span>
                        </div>
                    </div>

                    <Horario data={dataHorario} color={color} idIdioma={props.idIdioma} idHorario={props.idHorario} turnoInicio={itemHorario?.turnoInicio} turnoFin={itemHorario?.turnoFin}
                    />
                </div>
            </div>


        </>
    )
}
export default HorarioDetalle