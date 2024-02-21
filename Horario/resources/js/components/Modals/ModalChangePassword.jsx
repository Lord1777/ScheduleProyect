import React from 'react'
import '../../../css/Modals/ModalChangePassword.css'
import { useForm } from 'react-hook-form'
import useValidationForm from '../../hooks/useValidationForm'
import CloseEye from '../../assets/icons/close-eye.png'
import OpenEye from '../../assets/icons/open-eye.png'
import usePasswordToggle from '../../hooks/usePasswordToggle'
import useFecthPutPassword from '../../hooks/FetchPUT/useFecthPutPassword'
import { Loading } from '../Loading/Loading'
import exito from '../../assets/img/Exito.png'
import error from '../../assets/img/Advertencia.png'
import { ContinuoModal } from './ContinuoModal'

export const ModalChangePassword = ({ IdUser, open, close, }) => {
    if (!open) return null;

    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const showPassworToggle1 = usePasswordToggle();
    const showPassworToggle2 = usePasswordToggle();
    const { PASSWORD, } = useValidationForm();
    const newPassword = watch("newPassword", "");
    const confirmPasswordValidator = (value) => {
        return value === newPassword || "Las contraseñas no coinciden";
    };
    const { 
        fetchPutPassword,
        loading,
        setLoading,
        closeSuccessModal,
        successModalOpen,
        closeErrorModal,
        errorModalOpen,
        alertMessage,
        ruta, } = useFecthPutPassword();

    const onSubmit = async (data) => {
        setLoading(true);
        await fetchPutPassword(
            IdUser,
            data.newPassword
        )
        setLoading(false);
        console.log(IdUser)
    }

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <main className="box-shadow-modal-password">
                <div className="content-modal-password">
                    <h2>Cambiar Contraseña</h2>
                    <form method='POST' onSubmit={handleSubmit(onSubmit)}>

                        <div className="container-label-input" id='container-label-input-modal'>
                            <label>Ingrese contraseña nueva:</label>
                            <div className="contraseña">
                                <input
                                    type={showPassworToggle1.showPassword ? 'text' : 'password'}
                                    name="newPassword"
                                    placeholder='Nueva Contraseña'
                                    autoComplete='off'
                                    {...register("newPassword", PASSWORD)}
                                />
                                <img src={showPassworToggle1.showPassword ? OpenEye : CloseEye} onClick={showPassworToggle1.handleTogglePassword} />
                            </div>
                            {errors.newPassword && <p className='errors_forms'>{errors.newPassword.message}</p>}
                        </div>

                        <div className="container-label-input">
                            <label>Confirme la contraseña:</label>
                            <div className="contraseña">
                                <input
                                    type={showPassworToggle2.showPassword ? 'text' : 'password'}
                                    name="confirmNewPassword"
                                    placeholder='Confirmar Contraseña'
                                    autoComplete='off'
                                    {...register("confirmNewPassword", {
                                        validate: confirmPasswordValidator
                                    })}
                                />
                                <img src={showPassworToggle2.showPassword ? OpenEye : CloseEye} onClick={showPassworToggle2.handleTogglePassword} />
                            </div>
                            {errors.confirmNewPassword && <p className='errors_forms'>{errors.confirmNewPassword.message}</p>}
                        </div>

                        <div className="contenedor-btn-modal-formP">
                            <button type='submit' className='save'>Guardar</button>
                            <button className='cancel' onClick={close}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </main>
            <ContinuoModal
                tittle="Error al actualizar de contraseña."
                imagen={error}
                message={alertMessage}
                open={errorModalOpen}
                close={() => {
                    closeErrorModal();
                    close(); // Cerrar el modal principal
                }}
                
            />
            <ContinuoModal
                tittle="Actualización Exitosa"
                imagen={exito}
                message={alertMessage}
                open={successModalOpen}
                close={() => {
                    closeSuccessModal();
                    close(); // Cerrar el modal principal
                }}
            />
        </>
    )
}
