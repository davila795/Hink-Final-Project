const faker = require('faker')
const fs = require('fs')

function generateMeeting() {
    let meetings = []
    for (let id = 17; id <= 37; id++) {
        const id = require('mongoose').Types.ObjectId()
        const title = faker.random.words(3)
        const date = faker.date.future()
        const time = faker.time.recent()
        const description = faker.random.words(20)

        meetings.push({
            _id: id,
            title: title,
            date: date,
            time: time,
            description: description
        })
    }
    return { data: meetings }
}

const generatedData = generateMeeting()
fs.writeFileSync('data.json', JSON.stringify(generatedData, null, '\t'))

