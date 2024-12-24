const daysCounter = document.querySelector(".days_counter")
const counter = document.querySelector(".counter")
const hoursCounter = document.querySelector(".hours_counter")
const minsCounter = document.querySelector(".minutes_counter")
const secsCounter = document.querySelector(".seconds_counter")
const labels = document.querySelectorAll(".label")
const eventTitle = document.querySelector("h1")
const newEvent = document.querySelector("#new-event")
const submitBtn = document.querySelector(".submit-btn")

function formatTime(time, counter) {
    let timeWord;
    if (time <= 1) {
        timeWord = counter.nextElementSibling.textContent
        if (timeWord.includes('s', timeWord[timeWord.length - 1])) {
            timeWord = counter.nextElementSibling.textContent.slice(0, -1)
            counter.nextElementSibling.innerHTML = timeWord
        }
    } else {
        timeWord = counter.nextElementSibling.textContent

        //Check if the word doesn't contain the letter 's' at the end
        if (!timeWord.includes('s', timeWord[timeWord.length - 1])) {
            timeWord += 's'
            counter.nextElementSibling.innerHTML = timeWord
        }
    }
    // Concatenate zero when timer is less than ten
    if (time < 10) {
        return '0' + time
    }
    return time;
}


function stopCounter(num) {
    return (num < 0) ? 0 : num
}


function count() {
    // Read event from local storage
    let event = JSON.parse(localStorage.getItem('event'));

    // Insert eventTitle into template
    eventTitle.innerHTML = event[0]["eventTitle"];

    // Insert event here
    let eventDate = new Date(event[0]["eventDate"]);
    let currentDate = new Date()
    let timeIntervalInS = stopCounter((eventDate - currentDate) / 1000)
    let minutesLeft = stopCounter(timeIntervalInS / 60)
    let hoursLeft = stopCounter(minutesLeft / 60)
    let daysLeft = stopCounter(hoursLeft / 24)

    // Assign Values
    daysCounter.innerHTML = formatTime(Math.floor(daysLeft), daysCounter)
    hoursCounter.innerHTML = formatTime(Math.floor(hoursLeft % 24), hoursCounter)
    minsCounter.innerHTML = formatTime(Math.floor(minutesLeft % 60), minsCounter)
    secsCounter.innerHTML = formatTime(Math.floor(timeIntervalInS % 60), secsCounter)
}

newEvent.addEventListener('submit', function (event) {
    event.preventDefault()
    localStorage.removeItem('event')
    window.location.href = './index.html'
})


window.addEventListener('DOMContentLoaded', function () {
    //When the localStorage is empty
    if (!localStorage.getItem('event')) {
        submitBtn.setAttribute('value', 'Set up an event')
    }

    try {
        // Run count function when page reloads to display counter value in advance
        count()

        // Run the count function every one sec
        setInterval(count, 1000)
    } catch (err) {

    }
})