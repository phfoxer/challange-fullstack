import { useState } from 'react';
import { useSnackbar } from 'notistack';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { TSearch } from '../../types'
import styles from './style.module.scss';
import { searchByAddress } from '../../service';

export const SearchBar = (props: TSearch) => {
  const { setLatitude, setLongitude, setZoom } = props

  const [address, setAddress] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const clearAddress = ()=>{
    setAddress('');
    setLatitude(null)
    setLongitude(null)
  }

  const searchAddress = () => {
    searchByAddress(search).then((response:any) => {
      const data = response.data
      if (data.status === 'OK') {
        const { formatted_address, geometry } = data.results[0]
console.log(formatted_address);

        setLatitude(geometry.location.lat)
        setLongitude(geometry.location.lng)
        setZoom(11)
        setAddress(formatted_address)
      }
    })
      .catch( (error:any)=> {
        enqueueSnackbar(error.response.data.message, {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          },
          action: <CancelIcon sx={{ color: '#fff', cursor: 'pointer' }} onClick={() => { closeSnackbar() }} />
        })
      })
  }

  return (
    <div className={styles.container}>
      <InputBase
        placeholder="Endereço"
        inputProps={{
          'aria-label': 'Endereço'
        }}
        onChange={(e) => setSearch(e.target.value)}
      />
      <IconButton type="button"  aria-label="Buscar" onClick={searchAddress}>
        <SearchIcon />
      </IconButton>
      <IconButton type="button"  aria-label="Buscar" onClick={clearAddress}>
        <CancelIcon />
      </IconButton>
    </div>
  )
}
