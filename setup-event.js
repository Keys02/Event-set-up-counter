const eventForm = document.querySelector("#event-form");
const eventName = document.querySelector(".event")

eventForm.addEventListener('submit', function (event) {
    if (event.preventDefault) {
        event.preventDefault()
    }

    let eventTitle = document.querySelector("#event-title").value.trim();
    let eventDate = document.querySelector("#event-date").value.trim();

    let eventSetUp = [
        {
            eventTitle: eventTitle,
            eventDate: eventDate
        }
    ]

    localStorage.setItem('event', JSON.stringify(eventSetUp))

    window.location.href = './event.html'

})

window.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('event')) {
        window.location.href = 'event.html'
    }
})