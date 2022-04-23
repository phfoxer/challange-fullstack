import { useEffect, useRef, useState } from 'react'


import CancelIcon from '@mui/icons-material/Cancel'

import axios from 'axios'
import { useSnackbar } from 'notistack'
import { cnpjClear } from '../../utils/cnpjFormat'
import { TAddress } from '../../types';
import {
  Formik,
  FormikHelpers,
  Form,
  Field,
  useFormik
} from 'formik';
import * as Yup from 'yup';

import styles from './style.module.scss';
import { SearchBar } from '../search-bar'

type Props = {
  setLatitude: (value: number | null) => void;
  setLongitude: (value: number | null) => void;
  setZoom: (value: number) => void;
  saved: () => void;
  latitude: number | null;
  longitude: number | null;
}

export const AddCompanyForm = (props: Props) => {
  const { latitude, longitude, setLatitude, setLongitude, setZoom, saved } = props;


  const formikRef: any = useRef();

  const form = useFormik({
    initialValues: {
      name: "",
      cnpj: "",
      lat: 0,
      lng: 0
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("O nome é obrigatório"),
      cnpj: Yup.string()
        .required("O CNPJ é obrigatório"),
      latitude: Yup.string()
        .required("Obrigatório"),
      longitude: Yup.string()
        .required("Obrigatório"),
    }),
    onSubmit: values => {
      console.log(values);
    }
  });

  useEffect(() => {
    if (formikRef && formikRef.current) {
      formikRef.current.setFieldValue('lat', latitude);
      formikRef.current.setFieldValue('lng', longitude);
    }
    return () => {
      clearFields();
    }
  }, [latitude])

  const [name, setName] = useState<string>('');
  const [cnpj, setCnpj] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [googleAddress, setGoogleAddress] = useState<TAddress | null>(null);
  const [registerEnable, handleRegisterEneble] = useState<boolean>(false);

  const infoMessageDefault = 'Preencha todos os campos para habilitar o cadastro *'

  const [infoMessage, setInfoMessage] = useState<string>(infoMessageDefault)

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const clearFields = () => {
    setName('')
    setCnpj('')
    setAddress('')
    setGoogleAddress({} as TAddress)
    setLatitude(null)
    setLongitude(null)
    setZoom(10)
    handleRegisterEneble(false)
    setInfoMessage(infoMessageDefault)
  }

  const saveCompany = () => {
    const companyData = {
      apikey: process.env.REACT_APP_INTEGRATION_APIKEY,
      name,
      cnpj: cnpjClear(cnpj),
      address: googleAddress
    }

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_SERVER_HOST}/api/company`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(companyData)
    })
      .then(function () {
        enqueueSnackbar('Cadastro realizado com sucesso', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          },
          action: <CancelIcon sx={{ color: '#fff', cursor: 'pointer' }} onClick={() => { closeSnackbar() }} />
        })
        clearFields()
        saved()
      })
      .catch(function (error) {
        let message = 'Não foi possível realizar o cadastro. Contate o administrador.'

        if (error.response) {
          message = error.response.data.message
          setInfoMessage(`${message} - Adicione o campo e refaça a busca para recalcular latitude/longitude e habilitar o cadastro *`)
        }

        enqueueSnackbar(message, {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          },
          action: <CancelIcon sx={{ color: '#fff', cursor: 'pointer' }} onClick={() => { closeSnackbar() }} />
        })

        handleRegisterEneble(false)
      })
  }

  const createCompany = (values: any, actions: FormikHelpers<any>) => {
    console.log('values', values);
  }

  return (
    <div className={styles.container}>
      <h1>Cadastre uma clínica </h1>
      <Formik
        innerRef={formikRef}
        initialValues={form}
        onSubmit={(values, actions) => {
          createCompany(values, actions);
          actions.setSubmitting(false);
        }}
      >
        <Form className={styles.form}>
          <div className={styles.form_control}>
            <label htmlFor="firstName" className={styles.label}>Nome fantasia*</label>
            <Field id="name" name="name" placeholder="" className={styles.input} />
          </div>
          <div className={styles.form_control}>
            <label htmlFor="CNPJ" className={styles.label}>CNPJ*</label>
            <Field id="CNPJ" name="cnpj" placeholder="" className={styles.input} />
          </div>

          <div className={styles.form_location}>
            <div className={styles.form_location_title}>Localização</div>
            <div className={styles.form_location_content} >
              <div className={styles.address}>
                <SearchBar setLatitude={setLatitude} setLongitude={setLongitude} setZoom={setZoom} />
              </div>
              <div className={styles.lat}>
                <div className={styles.form_control}>
                  <label htmlFor="firstName" className={styles.label}>Latitude*</label>
                  <Field readOnly id="latitude" name="lat" placeholder="" className={styles.input} />
                </div>
              </div>
              <div className={styles.lng}>
                <div className={styles.form_control}>
                  <label htmlFor="firstName" className={styles.label}>Longitude*</label>
                  <Field readOnly id="longitude" name="lng" placeholder="" className={styles.input} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.form_control}>
            <button type="submit" className={styles.submit} onClick={saveCompany}>Salvar e continuar</button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}
