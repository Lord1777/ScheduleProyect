import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL, csrf_token } from "../../const/api";
import { useFetchPutEnvironment } from "../../hooks/FetchPUT/useFetchPutEnvironment";
import { Loading } from "../Loading/Loading";
import { useForm } from "react-hook-form";
import { ContinuoModal } from "../Modals/ContinuoModal";
import { getYesOrNotByNumber } from "../../hooks/useObjectMapping";
import useDropdown from "../../hooks/useDropdown";
import useValidationForm from "../../hooks/useValidationForm";
import exito from '../../assets/img/Exito.png'
import error from '../../assets/img/Advertencia.png'
import '../../../css/Form/FormAddAmbiente.css'


export const FormUpdateAmbiente = () => {

    const userToken = localStorage.getItem('access_token');
    
    const { id } = useParams();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { N_AMBIENTE, CAPACIDAD_AMBIENTE, C_MESAS, C_COMPUTADORES, AIRE_ACONDICIONADO, VIDEO_BEAM, SEDE, TABLERO } = useValidationForm();
    const dropdown1 = useDropdown(setValue, "aireAcondicionado");
    const dropdown2 = useDropdown(setValue, "videoBeam");
    const dropdown3 = useDropdown(setValue, "sede");
    const dropdown4 = useDropdown(setValue, "tablero");
    const { fetchPutEnvironment, successModalOpen, errorModalOpen, closeSuccessModal, closeErrorModal, alertMessage, ruta } = useFetchPutEnvironment(id);
    const [ambiente, setAmbiente] = useState(null);
    const [capacidad, setCapacidad] = useState(null);
    const [mesas, setMesas] = useState(null);
    const [computadores, setComputadores] = useState(null);
    const [aireacondicionado, setAireacondicionado] = useState(null);
    const [videoBeam, setVideoBeam] = useState(null);
    const [sede, setSede] = useState(null);
    const [tablero, setTablero] = useState(null);
    const [loading, setLoading] = useState(true);

    // const mapBooleanToYesOrNo = (value) => {
    //     return value ? "Si" : "No";
    // };
    getYesOrNotByNumber()
    const fetchData = async () => {
        try {
            const response = await fetch(`${API_URL}/getEnvironment/${id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                    'Cookie': csrf_token,
                },
                redirect: "follow",
            });
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const Data = await response.json();

            setAmbiente(Data.ambiente);
            setCapacidad(Data.capacidad);
            setMesas(Data.cantidadMesas);
            setComputadores(Data.cantidadComputadores);
            setSede(Data.sede);
            setAireacondicionado(getYesOrNotByNumber(Data.aireAcondicionado));
            setVideoBeam(getYesOrNotByNumber(Data.videoBeam));
            setTablero(getYesOrNotByNumber(Data.tablero));

            setValue("ambiente", Data.ambiente);
            setValue("capacidad", Data.capacidad);
            setValue("cantidadMesas", Data.cantidadMesas);
            setValue("cantidadComputadores", Data.cantidadComputadores);
            setValue("aireAcondicionado", getYesOrNotByNumber(Data.aireAcondicionado));
            setValue("videoBeam", getYesOrNotByNumber(Data.videoBeam));
            setValue("sede", Data.sede);
            setValue("tablero", getYesOrNotByNumber(Data.tablero));

            dropdown1.setSelectedOption(getYesOrNotByNumber(Data.aireAcondicionado));
            dropdown2.setSelectedOption(getYesOrNotByNumber(Data.videoBeam));
            dropdown3.setSelectedOption(Data.sede);
            dropdown4.setSelectedOption(getYesOrNotByNumber(Data.tablero));

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

    const onSubmit = async (data) => {
        setLoading(true);
        await fetchPutEnvironment(
            data.ambiente,
            data.cantidadMesas,
            data.capacidad,
            data.cantidadComputadores,
            data.aireAcondicionado,
            data.tablero,
            data.videoBeam,
            data.sede
            );
        setLoading(false);
    };

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <main className="container_form_add_ambiente">
                <div className="box_form_ambiente">
                    <h2 className="title_underline">Detalles Ambiente</h2>
                    <div className="container_form_add">
                        <form method="PUT" onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid-column">
                                <div className="container-label-input">
                                    <label>Ambiente</label>
                                    <input
                                        type="number"
                                        name="ambiente"
                                        placeholder="Numero del Ambiente"
                                        autoComplete="off"
                                        {...register("ambiente", N_AMBIENTE)}
                                        value={ambiente}
                                        onChange={(e) =>
                                            setAmbiente(e.target.value)
                                        }
                                    />
                                    {errors.ambiente && (<p className="errors_forms">{errors.ambiente.message}</p>)}
                                </div>

                                <div className="container-label-input">
                                    <label>Aire Acondicionado</label>
                                    <div className={`Dropdown ${dropdown1.isDropdown ? "open" : ""}`}>
                                        <input
                                            type="text"
                                            name="aireAcondicionado"
                                            className="textBox"
                                            placeholder="Aire Acondicionado"
                                            readOnly
                                            onClick={dropdown1.handleDropdown}
                                            value={dropdown1.selectedOption}
                                            {...register("aireAcondicionado", AIRE_ACONDICIONADO)}
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

                                <div className="container-label-input">
                                    <label>Capacidad</label>
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

                                <div className="container-label-input">
                                    <label>Video Beam</label>
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
                                                "videoBeam",
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

                                <div className="container-label-input">
                                    <label>Cantidad de Mesas</label>
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

                                <div className="container-label-input">
                                    <label>Sede</label>
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
                                                    dropdown3.handleOptionClick("cbi",setValue,"sede"
                                                    )
                                                }
                                            >
                                                CBI
                                            </div>
                                            <div
                                                onClick={() =>
                                                    dropdown3.handleOptionClick("industrial",setValue,"sede"
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

                                <div className="container-label-input">
                                    <label>Computadores</label>
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

                                <div className="container-label-input">
                                    <label>Tablero</label>
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
                                            {...register("tablero", TABLERO)}
                                        />
                                        <div
                                            className={`options ${dropdown4.isDropdown ? "open" : "" }`}>
                                            <div onClick={() => dropdown4.handleOptionClick("Si",setValue,"tablero")}>
                                                Si
                                            </div>
                                            <div onClick={() => dropdown4.handleOptionClick("No",setValue,"tablero")}>
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
                                <Link to={'/CrudAmbientes'}>
                                    <button className="cancelar">Cancelar</button>
                                </Link>

                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <ContinuoModal
                tittle="Error en la Actualización"
                imagen={error}
                message={alertMessage}
                open={errorModalOpen}
                close={closeErrorModal}
                route={ruta}
            />
            <ContinuoModal
                tittle="Actualización Exitosa"
                imagen={exito}
                message="Los datos se actualizaron correctamente."
                open={successModalOpen}
                close={closeSuccessModal}
                route="/CrudAmbientes"
            />
        </>
    );
};
