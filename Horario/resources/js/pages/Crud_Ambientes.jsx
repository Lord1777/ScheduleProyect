import React from "react";
import { NavBar } from "../components/NavBar/NavBar";
import Editar from '../assets/img/Editar.png'
import Eliminar from '../assets/img/Eliminar.png'
import '../../css/Table-Ambientes/Table-Ambientes.css'

export const Crud_Ambientes = () => {
    return (
        <>
            <NavBar></NavBar>
            <main className="container_all_crud">
                <div className="container_search_btn">
                    <div className="container_search_crud">
                        <input
                            type="search"
                            name="search"
                            placeholder="Buscar"
                        />
                    </div>
                    <div className="container_btn_products">
                        <a href="/Add">
                            <button>Agregar Productos</button>
                        </a>
                    </div>
                </div>
                <div className="container_table_crud">
                    <table className="content_table">
                        <thead>
                            <tr>
                                <th>Ambiente</th>
                                <th>Tipo de Ambiente</th>
                                <th>Capacidad</th>
                                <th>Lugar de Ambiente</th>
                                <th>Color</th>
                                <th>Talla</th>
                                <th>Stock</th>
                                <th>Precio</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>101</td>
                                <td>Sistemas</td>
                                <td>30</td>
                                <td>CBI</td>
                                <td>
                                    <div className="container_btns_tabla">
                                        <button className="btn_crud">
                                            <img src={Editar} alt="editar" />
                                        </button>
                                        <button>
                                            <img
                                                src={Eliminar}
                                                alt="eliminar"
                                            />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    );
};
