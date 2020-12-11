import axios from 'axios'

export default class MeetingServices {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/meetings',
            withCredentials: true
        })
    }

    getMeetings = () => this.apiHandler.get('/')
    getMeeting = meetingId => this.apiHandler.get(`/getMeeting/${meetingId}`)
    saveMeeting = meetingInfo => this.apiHandler.post(`/newMeeting/`, meetingInfo)
    editMeeting = (meetingId, meetingInfo) => this.apiHandler.put(`/editMeeting/${meetingId}`, meetingInfo)
    deleteMeeting = meetingId => this.apiHandler.delete(`/deleteMeeting/${meetingId}`)
    addAssistant = meetingId => this.apiHandler.put(`/addAssistant/${meetingId}`)
}