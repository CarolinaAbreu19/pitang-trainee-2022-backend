# Back-end - Pitang | Program Trainee 2022

## To run this project

* In folder `/src/config` copy the `.env.example` file and paste on the root folder of this application
* In the application repository, open the terminal and type the following command:

```
yarn install
```

* And then, type this command:

```
yarn dev
```

* A message should be displayed indicating which port the server is running on:

```
Server running on PORT 3333
```
## To run the tests

* After running the `yarn install` command, you can type the following command:

```
yarn test
```

---

## Description

Given the current scenario, there is a huge demand for people to take the vaccine to
the COVID-19. And with that our city is in need of a simple system to carry out
the appointments.
The process consists of creating a portal where it will be possible to schedule patients for
take the vaccine, build a page to consult the appointments made per day and hour.

## Usage rules

* Availability of places is 20 per day.
* Each time only has the availability of 2 appointments for the same time.
* A page must be created to consult the appointments.
* The result of the appointments must be grouped by the day and time of the appointment.
* The time interval between one appointment and another is 1 hour.

## Business rules

* The patient must inform his name, date of birth and day and time for the appointment.
* It must be checked if the form has been filled out.
* Patient data/schedules must be stored in memory.
* It must be possible to view the list of appointments made and inform whether the appointment was made or not, and what was the conclusion of the service (if it was performed).

## Execution rules

* Build an API in Node to receive data from the portal.
* Use yup to validate data in the API.
* Use yup for data validation
* IDE is your choice.

## Rating criteria

* Code organization
* Organization of commits
* Repository organization
* Enforcement of all established rules
* Creating tests