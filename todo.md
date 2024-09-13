- Add possibility to remove and edit these news

- Correct bug where possible to add 2 news by clicking 2 time fast add button on slow network connexion (It launch 2 time the request before the 1 st one complited and result make effect)

- Fix add news date and time lenght on small screen

- Add white background on connexion form

- Add white background for deconnexion text

- Rename DOMAIN settings to express domain

- Organisate angular structure gerneral dir, component dir, services dir

- Unificate the migrations

- Switch to angular 18

- Simplificate read me by reducing size and add statement to adapt .sh by .ps1 depending on the os

- Simplificate news element (set mode for creation, edit, display) and render group rendering

- Add possibility to see user data (first & last name, email, creation date, activation date)

- Add possibility to add user (first & last name, email) and when the user is created, it send a mail with a link who have an long key in the get to activate the account. On the activate account page, if the account dont have any pass, it prompt a password field. Allow account activation only when key + password fill. Use the domain nicolas-lennard.com for the mail now. Save each type of mail send in a table with the date & time & reciver email to avoid spam.

- Use of angular date picker insted of the input of type date now used

- Make a sort that js, html and css are compressed for faster loading slow connexion

- Check to replace the time picker by a better one 

- Add possibility to change password (Even for non activated account, and it activate account on the password recet action)

- Add possibility for user to send password recet mail to an other

- Add possibility for 1 user to delete an other user (exept base user)

- For user activation and recet, only send mail if user exist and tell to the user to only send if user exist (and in the case of activate only if non activated)

- Add timeout for the recet & activate link

- On failed attempt login, propose to activate account or to recet pass

- Add scrapper service (cypress) who will send data to the db by api (with an api key)

- Implement offer / demand page based on the api result with link to comunity forge

- Add photos to news

- Update read me to add github recommendation

- Check to switch docker image to alpine to boost performance

- Add tech stack to the readme

- Change db conn to mysql2 as it's alredy used by typeorm

- Update readme for migrations (file name using kebab case & see to change :generate by :create)

- Add team page (text, photos needed)

- Add contact page (text, location, photo)

- Add social links

- Change home page (photo, texts needed)

- Remove news letter link

- Add rules (texts needed)

- Change a propos by Notre vision (Texts needed)

- Change logo and background of news

- Add possibility for anyone to send contact form

Futur possible évolution :

- Add économy system with members, rôles and exchange, demand, offer insted of comunity forge

- Migrate server dedicated server for prod