import React, { useState, useEffect } from "react";
import "../../../css/Form/BoxContainerFormAdd.css";
import "../../../css/Form/FormAddFicha.css";
import useDropdown from "../../hooks/useDropdown";
import useValidationForm from "../../hooks/useValidationForm";
import { useForm } from "react-hook-form";
import { API_URL } from "../../const/api";
import { useParams } from "react-router-dom";
import { useFetchPutRecord } from "../../hooks/FetchPUT/useFetchPutRecord";

export const FormUpdateFicha = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    const dropdown1 = useDropdown(setValue, "Modalidad");
    const dropdown2 = useDropdown(setValue, "JornadaAcademica");
    
    const {
        NFICHA,
        DURACION,
        PROGRAMA,
        MODALIDAD,
        JORNADA_ACADEMICA,
    } = useValidationForm();

    const { id } = useParams();
    const [ficha, setFicha] = useState(null);
    const [duracion, setDuracion] = useState(null);
    const [programa, setPrograma] = useState(null);
    const [modalidad, setModalidad] = useState(null);
    const [jornada, setJornada] = useState(null);



    useEffect(() => {
        if (id) {
            fetch(`${API_URL}/GetFicha/${id}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            `Network response was not ok: ${response.statusText}`
                        );
                    }
                    return response.json();
                })
                .then((Data) => {
                    console.log(Data);
                    setFicha(Data.ficha);
                    setDuracion(Data.duracion);
                    setPrograma(Data.nombre);

                    setValue("NFicha", Data.ficha )
                    setValue("Duracion", Data.duracion)
                    setValue("Programa", Data.nombre)
                    setValue("Modalidad", Data.modalidad)
                    setValue("JornadaAcademica", Data.jornada)

                    dropdown1.setSelectedOption(Data.modalidad);
                    dropdown2.setSelectedOption(Data.jornada);
                })
                .catch((error) => {
                    console.error(
                        "Error al cargar los detalles del producto:",
                        error
                    );
                });
        }
    }, [id]);

    const { fetchPutRecord } = useFetchPutRecord(id);

    const onSubmit = async (data) => {
        
        console.log(data)
        
        await fetchPutRecord(
                data.ficha,
                data.duracion,
                data.programa,
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
                                <div>
                                    <input
                                        type="number"
                                        name="NFicha"
                                        placeholder="N° Ficha"
                                        {...register("ficha", NFICHA)}
                                        value={ficha}
                                        onChange={(e) =>
                                            setFicha(e.target.value)
                                        }
                                    />
                                    {errors.NFicha && (
                                        <p className="errors_forms">
                                            {errors.NFicha.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <input
                                        type="number"
                                        name="Duracion"
                                        placeholder="Duración"
                                        {...register("duracion", DURACION)}
                                        value={duracion}
                                        onChange={(e) =>
                                            setDuracion(e.target.value)
                                        }
                                    />
                                    {errors.Duracion && (
                                        <p className="errors_forms">
                                            {errors.Duracion.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        name="Programa"
                                        placeholder="Programa"
                                        {...register("programa", PROGRAMA)}
                                        value={programa}
                                        onChange={(e) =>
                                            setPrograma(e.target.value)
                                        }
                                    />
                                    {errors.Programa && (
                                        <p className="errors_forms">
                                            {errors.Programa.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <div
                                        className={`Dropdown ${dropdown1.isDropdown ? "open" : ""
                                            }`}
                                    >
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
                                            className={`options ${dropdown1.isDropdown
                                                    ? "open"
                                                    : ""
                                                }`}
                                        >
                                            <div
                                                onClick={() =>
                                                    dropdown1.handleOptionClick(
                                                        "Presencial",
                                                        setValue,
                                                        "Modalidad"
                                                    )
                                                }
                                            >
                                                Presencial
                                            </div>
                                            <div
                                                onClick={() =>
                                                    dropdown1.handleOptionClick(
                                                        "Virtual",
                                                        setValue,
                                                        "Modalidad"
                                                    )
                                                }
                                            >
                                                Virtual
                                            </div>
                                        </div>
                                    </div>
                                    {errors.Modalidad && (
                                        <p className="errors_forms">
                                            {errors.Modalidad.message}
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
                                            className="textBox"
                                            placeholder="Jornada Académica"
                                            name="JornadaAcademica"
                                            readOnly
                                            onClick={dropdown2.handleDropdown}
                                            value={dropdown2.selectedOption}
                                            {...register(
                                                "Jornada",
                                                JORNADA_ACADEMICA
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
                                                        "Diurna",
                                                        setValue,
                                                        "JornadaAcademica"
                                                    )
                                                }
                                            >
                                                Diurna
                                            </div>
                                            <div
                                                onClick={() =>
                                                    dropdown2.handleOptionClick(
                                                        "Nocturna",
                                                        setValue,
                                                        "JornadaAcademica"
                                                    )
                                                }
                                            >
                                                Nocturna
                                            </div>
                                        </div>
                                    </div>
                                    {errors.JornadaAcademica && (
                                        <p className="errors_forms">
                                            {errors.JornadaAcademica.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="container-btns">
                                <button className="guardar" type="submit">
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

export default FormUpdateFicha;
