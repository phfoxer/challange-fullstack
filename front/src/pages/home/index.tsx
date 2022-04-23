/* eslint-disable no-undef */


import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import styles from './style.module.scss';
import { useEffect, useState } from 'react';
import { AddCompanyForm } from '../../components/form-new';
import { SearchBar } from '../../components/search-bar';
import { TCompany } from '../../types';

export const Maps = (props: { apiKey: string }) => {

  const containerStyle = {
    width: '100%',
    height: '100vh'
  }
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)

  const [navigatorGeoLat, setNavigatorGeoLat] = useState<number>(0)
  const [navigatorGeoLng, setNavigatorGeoLng] = useState<number>(0)
  const [zoom, setZoom] = useState<number>(5)

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      setNavigatorGeoLat(position.coords.latitude)
      setNavigatorGeoLng(position.coords.longitude)
      setZoom(8)
    })
  }

  const [companyList, setCompanyList] = useState<TCompany[]>([]);



  const FormMap = () => {
    return <AddCompanyForm
      latitude={latitude}
      longitude={longitude}
      setLatitude={setLatitude}
      setLongitude={setLongitude}
      setZoom={setZoom}
      saved={(() => { 1 + 1; })}
    />

  }

  const Search = () => {
    return <SearchBar setLatitude={setLatitude} setLongitude={setLongitude} setZoom={setZoom} />
  }

  return (
    <div className="map">
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_APIKEY as string} >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: latitude ?? navigatorGeoLat, lng: longitude ?? navigatorGeoLng }}
          zoom={zoom}
          onClick={(map: google.maps.MapMouseEvent) => {
            let latitude = map?.latLng?.lat();
            let longtitude = map?.latLng?.lng();

            if (latitude && longtitude) {
              setLatitude(latitude);
              setLongitude(longtitude);
            }

          }}
        >
          <div className={styles.barContainer}>
            <div className={styles.form} >
              <FormMap />
            </div>
            <div className={styles.search} >
              <Search />
            </div>


            {/*
              companyList.length > 0
              && <div>
                <Grid item  {...attrs} sx={style.companyList}>
                  <List sx={{ mb: 2, width: '100%' }}>
                    {companyList.map((item: TCompany) => <ClinicCard {...item} key={item.id} />)}
                  </List>
                </Grid>
              </div>
            */}
          </div>

          {companyList.map((item: TCompany) => {
            return (
              <Marker
                key={item.id}
                position={{
                  lat: item.address.lat as number,
                  lng: item.address.lng as number
                }}
              />
            )
          })}

          {latitude && longitude
            ? <Marker
              position={{ lat: latitude, lng: longitude }}
              icon="http://localhost:3000/marker.png"
            />
            : ''}

        </GoogleMap>
      </LoadScript>
    </div>
  )
}
