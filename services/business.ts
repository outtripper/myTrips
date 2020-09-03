import axios from "axios"

export const getToken = () => {
  
}

export const setToken = () => {

}

export const getActiveTrips = () => {
  return axios.post('https://private-d9934-mytrips2.apiary-mock.com/getActiveTrips')
    .then(result => result.data)
}

export const getMyTrip = () => {
  return axios.post('https://private-d9934-mytrips2.apiary-mock.com/getTripInfo')
    .then(result => result.data)
}