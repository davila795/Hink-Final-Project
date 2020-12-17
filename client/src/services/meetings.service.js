import axios from 'axios'

export default class MeetingServices {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/meetings`,
            withCredentials: true
        })
    }

    getMeetings = () => this.apiHandler.get('/')
    getMeeting = meetingId => this.apiHandler.get(`/getMeeting/${meetingId}`)
    saveMeeting = meetingInfo => this.apiHandler.post(`/newMeeting/`, meetingInfo)
    editMeeting = (meetingId, meetingInfo) => this.apiHandler.put(`/editMeeting/${meetingId}`, meetingInfo)
    deleteMeeting = meetingId => this.apiHandler.delete(`/deleteMeeting/${meetingId}`)
    addAssistant = meetingId => this.apiHandler.put(`/addAssistant/${meetingId}`)
    addComment = (meetingId, message) => this.apiHandler.put(`/addComment/${meetingId}`, message)
    getUserMeetings = () => this.apiHandler.get('/getUserMeetings')
}