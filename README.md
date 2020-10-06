# Weather calendar
This project is the front end for a simple calendar app, where the user can set reminders containing a small text, a color, city and time. If available the app will fetch a weather forecast from Open Weather for each reminder.

Weather calendar was crated during a 5-day coding challenge. It uses [Create React App](https://github.com/facebook/create-react-app).

## The Challenge
The challenge asked for the front-end for a calendar that allowed users to add and edit notes. It specifically asked for no back-end.

### Bugs fixed after challenge was submitted
- [+] ALL - Days in January aren't displayed at all in mobile devices.
- [+] ALL - Calendar opens on September 2020 instead of the current year.

## How to run this program
This app is hosted online at [weather-calendar.netlify.app](https://weather-calendar.netlify.app), but you can run it locally with the following commands.

First, if you haven't done so, clone the app to a local folder and open the its folder:
```
git clone https://github.com/isacvale/weather-calendar.git
cd weather-calendar
```
Then you can run the development version by running:
```
yarn && yarn start
```
Or you can run the production version:
```
yarn build && cd build && npx lite-server
```
## Challenge checklist
- [+] User can add reminder notes containing text, city, day and time.
- [+] The app displays reminder notes on a calender, sorted by time.
- [+] User can assign colors to notes.
- [+] User can edit reminder notes.
- [+] When available, weather data is fetched and displayed for each note, taking in account the time and city.
- [+] Unit tests for adding reminder notes are in place.

### Bonus checklist
- [+] Calendar is dynamic and can accommodate multiple months/years.
- [+] Handles multiple reminders in a single day.
- [+] User can delete individual notes or all notes in a day.

### Extras
- [+] user can add random notes on one click, for ease of testing.
- [+] Page must be response.
- [+] Weekends should have a slightly diffent background.
- [+] Change app meta information, title and favicon.
- [+] User can create a note on a day by clicking it.
- [+] Bug. Time shows as null when not selected.
- [+] Delete operations should have a confirmation message.
- [+] Adds holidays from Calendarific API.

### To do
- [] Functional tests should be automated.
- [] Search by city would be improved with autocomplete, allowing fetching weather forecast by city ID, which would remove ambiguity.

## Functional tests
In the abscence of a lab or browserstack, tests are done locally in browsers available, all of which the latest versions on Linux and Android, except from Edge, supplied by BrowserStack.
### Steps
- Create a new reminder (A) with the add reminder button, without adding a text.
[Reminder A should be deleted]

- Repeat the operation to create new reminder with (B) a text.
- Changing date of the reminder B.
- Changing time of the reminder B.
[App should not crash]

- Create a new reminder (C) by clicking on a date.
- Edit reminder C so it is on the same day, but earlier than B.
[C should be displayed before B]
- Edit reminder C to change color.
- CLick the "clear" button and confirm.
[Both reminders should be deleted.]

- Create a reminder (D) on the tomorrow square, and add a city name.
[There should be a weather forecast.]

- Create a reminder (E) on the same day.
- Edit reminder D, click and confirm the delete.
[Reminder D should be deleted, but not E.]

- Edit reminder E, change the text for a single word with 30 characters.
[They should wrap and not overflow the text area.]
- Edit reminder E, delete the text, then press and confirm delete.
[The site should not crash.]

- Click "add random example" enough times so that at least 4 reminders appear on the same day.
[They should be ordered by time.]

- Add new reminders (F) and (G) on the first and last days of the month.
[Visit the previous and last days and check if the reminders F and G are visible - assuming their days are visible.]

## Detected bugs
- [+] ALL - Clear button should take all width, because it prevent clicking to create new reminder.
- [+] ALL - If the screen is small enough in height, the reminder dialog becomes inaccessible.
- [+] FIREFOX - Colors in dialog take three rows.
- [+] FIREFOX - Date/time widget doesn't work on Firefox(!).
- [+] EDGE - Ordering of reminders is not working (B and C). It does on random messages. Couldn't reproduce.
- [+] ALL - Weather API returns errors when no data is found, that should be catched.

 - No specific bugs in Chrome, Chrome for Android, and Opera.
