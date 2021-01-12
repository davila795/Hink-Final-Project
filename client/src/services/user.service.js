import axios from 'axios'

export default class UserServices {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/user`,
            withCredentials: true
        })
    }

    getProfile = userId => this.apiHandler.get(`/profile/${userId}`)
    editProfile = (userId, userInfo) => this.apiHandler.put(`/editProfile/${userId}`, userInfo)
    deleteProfile = (userId) => this.apiHandler.delete(`/deleteProfile/${userId}`)
    addMeeting = (userId, meetingId) => this.apiHandler.put(`/addMeeting/${userId}/${meetingId}`)
    deleteMeeting = (userId, meetingId) => this.apiHandler.delete(`/deleteMeeting/${userId}/${meetingId}`)
    addContact = (userId, contactId) => this.apiHandler.put(`/addContact/${userId}/${contactId}`)
    deleteContact = (userId, contactId) => this.apiHandler.delete(`/deleteContact/${userId}/${contactId}`)
}