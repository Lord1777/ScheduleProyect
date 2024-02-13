import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { API_URL, csrf_token } from "../../const/api";
import { Link, useParams } from "react-router-dom";
import { useFetchPutRecord } from "../../hooks/FetchPUT/useFetchPutRecord";
import { Loading } from "../Loading/Loading";
import { ContinuoModal } from "../Modals/ContinuoModal";
import useDropdown from "../../hooks/useDropdown";
import useValidationForm from "../../hooks/useValidationForm";
import exito from '../../assets/img/Exito.png'
import error from '../../assets/img/Advertencia.png'
import "../../../css/Form/BoxContainerFormAdd.css";
import "../../../css/Form/FormAddFicha.css";


export const FormUpdateFicha = () => {

    const userToken = localStorage.getItem('access_token');

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const dropdown1 = useDropdown(setValue, "Modalidad");
    const dropdown2 = useDropdown(setValue, "Jornada");

    const {
        NFICHA,
        DURACION,
        PROGRAMA,
        MODALIDAD,
        JORNADA_ACADEMICA,
    } = useValidationForm();

    const { id } = useParams();
    const [ficha, setFicha] = useState(null);
    const [programa, setPrograma] = useState(null);
    const [loading, setLoading] = useState(true)

    const { fetchPutRecord, successModalOpen, errorModalOpen, closeSuccessModal, closeErrorModal, } = useFetchPutRecord(id);

    const fetchData = async () => {
        try {
            const response = await fetch(`${API_URL}/GetFicha/${id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                    'Cookie': csrf_token,
                },
                redirect: "follow",
            })
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const Data = await response.json();
            setFicha(Data.ficha);
            setPrograma(Data.nombre);
            setValue("NFicha", Data.ficha)
            setValue("Programa", Data.nombre)
            setValue("Modalidad", Data.modalidad)
            setValue("JornadaAcademica", Data.jornada)
            dropdown1.setSelectedOption(Data.modalidad);
            dropdown2.setSelectedOption(Data.jornada);
            setLoading(false);
        } catch (error) {
            console.error("Error al cargar los detalles ficha:", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id, setValue]);

    if (loading) {
        return <Loading />
    }

    const onSubmit = async (data) => {
        await fetchPutRecord(
            data.ficha,
            data.Modalidad,
            data.Jornada
        );
    };
    

    return (
        <>
            <main className="container_all_form">
                <div className="box_form">
                    <h2 className="title_underline">Detalles de la Ficha</h2>
                    <div className="container_form_add">
                        <form method="PUT" onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid-column">
                                <div className="container-label-input">
                                    <label>N° Ficha</label>
                                    <input
                                        type="number"
                                        name="NFicha"
                                        placeholder="N° Ficha"
                                        autoComplete="off"
                                        {...register("ficha", NFICHA)}
                                        value={ficha}
                                        onChange={(e) =>
                                            setFicha(e.target.value)
                                        }
                                    />
                                    {errors.ficha && <p className='errors_forms'>{errors.ficha.message}</p>}
                                </div>

                                <div className="container-label-input">
                                    <label>Programa</label>
                                    <input
                                        type="text"
                                        name="Programa"
                                        placeholder="Programa"
                                        autoComplete="off"
                                        {...register("programa")}
                                        value={programa}
                                        onChange={(e) =>
                                            setPrograma(e.target.value)
                                        }
                                        readOnly
                                    />
                                    {/* {errors.programa && <p className='errors_forms'>{errors.programa.message}</p>} */}

                                </div>

                                <div className="container-label-input">
                                    <label>Modalidad</label>
                                    <div className={`Dropdown ${dropdown1.isDropdown ? "open" : ""}`}>
                                        <input
                                            type="text"
                                            className="textBox"
                                            placeholder="Modalidad"
                                            readOnly
                                            onClick={dropdown1.handleDropdown}
                                            value={dropdown1.selectedOption}
                                            {...register(
                                                "Modalidad",
                                                MODALIDAD
                                            )}
                                        />
                                        <div
                                            className={`options ${dropdown1.isDropdown ? "open" : ""}`}>
                                            <div onClick={() => dropdown1.handleOptionClick("Presencial", setValue, "Modalidad")}>
                                                Presencial
                                            </div>
                                            <div onClick={() => dropdown1.handleOptionClick("Virtual", setValue, "Modalidad")}>
                                                Virtual
                                            </div>
                                            <div onClick={() => dropdown1.handleOptionClick("Complementaria", setValue, "Modalidad")}>
                                                Complementaria
                                            </div>
                                        </div>
                                    </div>
                                    {errors.Modalidad && <p className='errors_forms'>{errors.Modalidad.message}</p>}
                                </div>


                                <div className="container-label-input">
                                    <label>Jornada</label>
                                    <div className={`Dropdown ${dropdown2.isDropdown ? "open" : ""}`}>
                                        <input
                                            type="text"
                                            className="textBox"
                                            placeholder="Jornada"
                                            name="Jornada"
                                            readOnly
                                            onClick={dropdown2.handleDropdown}
                                            value={dropdown2.selectedOption}
                                            {...register(
                                                "Jornada",
                                                JORNADA_ACADEMICA
                                            )}
                                        />
                                        <div className={`options ${dropdown2.isDropdown ? "open" : ""}`}>
                                            <div onClick={() => dropdown2.handleOptionClick("Diurna", setValue, "Jornada")}>
                                                Diurna
                                            </div>
                                            <div onClick={() => dropdown2.handleOptionClick("Nocturna", setValue, "Jornada")}>
                                                Nocturna
                                            </div>
                                        </div>
                                    </div>
                                    {errors.Jornada && <p className='errors_forms'>{errors.Jornada.message}</p>}

                                </div>
                            </div>

                            <div className="btns-crear">
                                <div className="container-btns-ficha">
                                    <button className='guardar' type="submit">Guardar</button>
                                    <Link to={'/CrudFichas'}>
                                        <button className="cancelar">
                                            Cancelar
                                        </button>
                                    </Link>

                                </div>
                                <Link to={`/AddHorario/${id}`} >
                                    <button className="horario" >
                                        Crear horario
                                    </button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <ContinuoModal
                tittle="Error en la Actualización"
                imagen={error}
                message="Ocurrió un error al actualizar los datos. Por favor, inténtalo de nuevo."
                open={errorModalOpen}
                close={closeErrorModal}
                route="/CrudFichas"
            />
            <ContinuoModal
                tittle="Actualización Exitosa"
                imagen={exito}
                message="Los datos se actualizaron correctamente."
                open={successModalOpen}
                close={closeSuccessModal}
                route="/CrudFichas"
            />
        </>
    );
};

export default FormUpdateFicha;