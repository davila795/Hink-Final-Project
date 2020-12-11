import axios from 'axios'

export default class UserServices {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/user',
            withCredentials: true
        })
    }

    getProfile = userId => this.apiHandler.get(`/profile/${userId}`)
    editProfile = userInfo => this.apiHandler.put(`/editProfile`, userInfo)
    deleteProfile = () => this.apiHandler.delete(`/deleteProfile`)
    addMeeting = meetingId => this.apiHandler.put(`/addMeeting/${meetingId}`)
    deleteMeeting = meetingId => this.apiHandler.delete(`/deleteMeeting/${meetingId}`)
    addContact = userId => this.apiHandler.put(`/addContact/${userId}`)
    deleteContact = userId => this.apiHandler.delete(`/deleteContact/${userId}`)
}