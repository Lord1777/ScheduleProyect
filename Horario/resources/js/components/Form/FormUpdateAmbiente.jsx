import React, { useEffect, useState } from "react";
import useDropdown from "../../hooks/useDropdown";
import { useForm } from "react-hook-form";
import useValidationForm from "../../hooks/useValidationForm";
import { useParams } from "react-router-dom";
import useFetchGetDetailsAmbiente from "../../hooks/FetchGET/useFetchGetDeatilsAmbiente";
import { API_URL } from "../../const/api";
import { useFetchPutEnvironment } from "../../hooks/FetchPUT/useFetchPutEnvironment";
import { Loading } from "../Loading/Loading";

export const FormUpdateAmbiente = () => {
    const { id } = useParams();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { N_AMBIENTE, CAPACIDAD_AMBIENTE, C_MESAS, C_COMPUTADORES, AIRE_ACONDICIONADO, VIDEO_BEAM, SEDE, TABLERO } = useValidationForm();
    const dropdown1 = useDropdown(setValue, "aireAcondicionado");
    const dropdown2 = useDropdown(setValue, "videoBeam");
    const dropdown3 = useDropdown(setValue, "sede");
    const dropdown4 = useDropdown(setValue, "tablero");
    const { fetchPutEnvironment } = useFetchPutEnvironment(id);
    const [ambiente, setAmbiente] = useState(null);
    const [capacidad, setCapacidad] = useState(null);
    const [mesas, setMesas] = useState(null);
    const [computadores, setComputadores] = useState(null);
    const [aireacondicionado, setAireacondicionado] = useState(null);
    const [videoBeam, setVideoBeam] = useState(null);
    const [sede, setSede] = useState(null);
    const [tablero, setTablero] = useState(null);
    const [loading, setLoading] = useState(true);

    const mapBooleanToYesOrNo = (value) => {
        return value ? "Si" : "No";
    };

    const fetchData = async () => {
        try {
            const response = await fetch(`${API_URL}/getEnvironment/${id}`);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const Data = await response.json();

            setAmbiente(Data.ambiente);
            setCapacidad(Data.capacidad);
            setMesas(Data.cantidadMesas);
            setComputadores(Data.cantidadComputadores);
            setSede(Data.sede);
            setAireacondicionado(mapBooleanToYesOrNo(Data.aireAcondicionado));
            setVideoBeam(mapBooleanToYesOrNo(Data.videoBeam));
            setTablero(mapBooleanToYesOrNo(Data.tablero));

            setValue("ambiente", Data.ambiente);
            setValue("capacidad", Data.capacidad);
            setValue("cantidadMesas", Data.cantidadMesas);
            setValue("cantidadComputadores", Data.cantidadComputadores);
            setValue("aireAcondicionados", mapBooleanToYesOrNo(Data.aireAcondicionado));
            setValue("videoBeams", mapBooleanToYesOrNo(Data.videoBeam));
            setValue("sede", Data.sede);
            setValue("tableros", mapBooleanToYesOrNo(Data.tablero));

            dropdown1.setSelectedOption(mapBooleanToYesOrNo(Data.aireAcondicionado));
            dropdown2.setSelectedOption(mapBooleanToYesOrNo(Data.videoBeam));
            dropdown3.setSelectedOption(Data.sede);
            dropdown4.setSelectedOption(mapBooleanToYesOrNo(Data.tablero));

            setLoading(false);
        } catch (error) {
            console.error("Error al cargar los detalles del producto:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id, setValue]);


    if (loading) {
        return <Loading />
    }

    const onSubmit = async (data) => {
        console.log(data)
        await fetchPutEnvironment(
            data.ambiente,
            data.cantidadMesas,
            data.capacidad,
            data.catidadComputadores,
            data.aireAcondicionados,
            data.tableros,
            data.videoBeams,
            data.sede
        );
    };

    return (
        <>
            <main className="container_form_add_ambiente">
                <div className="box_form_ambiente">
                    <h2 className="title_underline">Detalles Ambiente</h2>
                    <div className="container_form_add">
                        <form method="PUT" onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid-column">
                                <div>
                                    <input
                                        type="number"
                                        name="ambiente"
                                        placeholder="Numero del Ambiente"
                                        {...register("ambiente", N_AMBIENTE)}
                                        value={ambiente}
                                        onChange={(e) =>
                                            setAmbiente(e.target.value)
                                        }
                                    />
                                    {errors.ambiente && (
                                        <p className="errors_forms">{errors.ambiente.message}</p>
                                    )}
                                </div>

                                <div>
                                    <div
                                        className={`Dropdown ${dropdown1.isDropdown ? "open" : ""
                                            }`}
                                    >
                                        <input
                                            type="text"
                                            name="aireAcondicionado"
                                            className="textBox"
                                            placeholder="Aire Acondicionado"
                                            readOnly
                                            onClick={dropdown1.handleDropdown}
                                            value={dropdown1.selectedOption}
                                            {...register("aireAcondicionados", AIRE_ACONDICIONADO)}
                                        />
                                        <div
                                            className={`options ${dropdown1.isDropdown
                                                ? "open"
                                                : ""
                                                }`}
                                        >
                                            <div
                                                onClick={() =>
                                                    dropdown1.handleOptionClick(
                                                        "Si",
                                                        setValue,
                                                        "aireAcondicionado"
                                                    )
                                                }
                                            >
                                                Si
                                            </div>
                                            <div
                                                onClick={() =>
                                                    dropdown1.handleOptionClick(
                                                        "No",
                                                        setValue,
                                                        "aireAcondicionado"
                                                    )
                                                }
                                            >
                                                No
                                            </div>
                                        </div>
                                    </div>
                                    {errors.aireAcondicionado && (
                                        <p className="errors_forms">
                                            {errors.aireAcondicionado.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <input
                                        type="number"
                                        name="capacidad"
                                        placeholder="Capadidad del Ambiente"
                                        {...register(
                                            "capacidad",
                                            CAPACIDAD_AMBIENTE
                                        )}
                                        value={capacidad}
                                        onChange={(e) =>
                                            setCapacidad(e.target.value)
                                        }
                                    />
                                    {errors.capacidad && (
                                        <p className="errors_forms">
                                            {errors.capacidad.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <div
                                        className={`Dropdown ${dropdown2.isDropdown ? "open" : ""
                                            }`}
                                    >
                                        <input
                                            type="text"
                                            name="videoBeam"
                                            className="textBox"
                                            placeholder="Video Beam"
                                            readOnly
                                            onClick={dropdown2.handleDropdown}
                                            value={dropdown2.selectedOption}
                                            {...register(
                                                "videoBeams",
                                                VIDEO_BEAM
                                            )}
                                        />
                                        <div
                                            className={`options ${dropdown2.isDropdown
                                                ? "open"
                                                : ""
                                                }`}
                                        >
                                            <div
                                                onClick={() =>
                                                    dropdown2.handleOptionClick(
                                                        "Si",
                                                        setValue,
                                                        "videoBeam"
                                                    )
                                                }
                                            >
                                                Si
                                            </div>
                                            <div
                                                onClick={() =>
                                                    dropdown2.handleOptionClick(
                                                        "No",
                                                        setValue,
                                                        "videoBeam"
                                                    )
                                                }
                                            >
                                                No
                                            </div>
                                        </div>
                                    </div>
                                    {errors.videoBeam && (
                                        <p className="errors_forms">
                                            {errors.videoBeam.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <input
                                        type="number"
                                        name="cantidadMesas"
                                        placeholder="Cantidad Mesas"
                                        {...register("cantidadMesas", C_MESAS)}
                                        value={mesas}
                                        onChange={(e) =>
                                            setMesas(e.target.value)
                                        }
                                    />
                                    {errors.cantidadMesas && (
                                        <p className="errors_forms">
                                            {errors.cantidadMesas.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <div
                                        className={`Dropdown ${dropdown3.isDropdown ? "open" : ""
                                            }`}
                                    >
                                        <input
                                            type="text"
                                            name="idSede"
                                            className="textBox"
                                            placeholder="Sede"
                                            readOnly
                                            onClick={dropdown3.handleDropdown}
                                            value={dropdown3.selectedOption}
                                            {...register("sede", SEDE)}
                                        />
                                        <div
                                            className={`options ${dropdown3.isDropdown
                                                ? "open"
                                                : ""
                                                }`}
                                        >
                                            <div
                                                onClick={() =>
                                                    dropdown3.handleOptionClick(
                                                        "cbi",
                                                        setValue,
                                                        "sede"
                                                    )
                                                }
                                            >
                                                CBI
                                            </div>
                                            <div
                                                onClick={() =>
                                                    dropdown3.handleOptionClick(
                                                        "industrial",
                                                        setValue,
                                                        "sede"
                                                    )
                                                }
                                            >
                                                Industrial
                                            </div>
                                        </div>
                                    </div>
                                    {errors.sede && (
                                        <p className="errors_forms">
                                            {errors.sede.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <input
                                        type="number"
                                        name="cantidadComputadores"
                                        placeholder="Cantidad Computadores"
                                        {...register(
                                            "cantidadComputadores",
                                            C_COMPUTADORES
                                        )}
                                        value={computadores}
                                        onChange={(e) =>
                                            setComputadores(e.target.value)
                                        }
                                    />
                                    {errors.cantidadComputadores && (
                                        <p className="errors_forms">
                                            {
                                                errors.cantidadComputadores
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <div
                                        className={`Dropdown ${dropdown4.isDropdown ? "open" : ""
                                            }`}
                                    >
                                        <input
                                            type="text"
                                            name="tablero"
                                            className="textBox"
                                            placeholder="Tablero"
                                            readOnly
                                            onClick={dropdown4.handleDropdown}
                                            value={dropdown4.selectedOption}
                                            {...register("tableros", TABLERO)}
                                        />
                                        <div
                                            className={`options ${dropdown4.isDropdown
                                                ? "open"
                                                : ""
                                                }`}
                                        >
                                            <div
                                                onClick={() =>
                                                    dropdown4.handleOptionClick(
                                                        "Si",
                                                        setValue,
                                                        "tablero"
                                                    )
                                                }
                                            >
                                                Si
                                            </div>
                                            <div
                                                onClick={() =>
                                                    dropdown4.handleOptionClick(
                                                        "No",
                                                        setValue,
                                                        "tablero"
                                                    )
                                                }
                                            >
                                                No
                                            </div>
                                        </div>
                                    </div>
                                    {errors.tablero && (
                                        <p className="errors_forms">
                                            {errors.tablero.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="container-btns">
                                <button type="submit" className="guardar">
                                    Guardar
                                </button>
                                <button className="cancelar">Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
};
