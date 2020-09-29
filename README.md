# Weather calendar
This project is the front end for a simple calendar app, where the user can set reminders containing a small text, a color, city and time. If available the app will fetch a weather forecast from Open Weather for each reminder.

Weather calendar was crated during a 5-day coding challenge. It uses [Create React App](https://github.com/facebook/create-react-app).

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

### To do
- [] Bug. Time shows as null when not selected.
- [] Delete operations should have a confirmation message.
- [] Search by city would be improved with autocomplete, allowing fetching weather forecast by city ID, which would remove ambiguity.
- [] Days should have a "add note" button.