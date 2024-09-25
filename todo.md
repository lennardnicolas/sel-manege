- Add scrapper cypress to get offer and demand (import to be done by api with an api key), each time a news import is done, it delete the old records

- Add display of these offer and demand with a link to them

- Add social links

- Add rules (texts needed)

- Add team page (text, photos needed)

- Look to use the site in prod still paired with comunity forge for now (Rest of evolutions will come, but later)

- Add automatic test for api(mocha) and e2e(cypress)

-------------------------------------

- Add page to display user for authenticated

- Add account email activation by verification (link only valid 1h)

- Add account password change (Who activate the account if account not activated yet)

- Add roles : developpeur, administrateur, member, non membre

- Add protections for actions (dev cant be removed, only admin/ dev can add news, only admin can see user page)

- Add possibility to create account (for non membre)

- Add possibility to create account (from user page from admin) but it do not ask for password, it add the account and send a mail
 
- Add possibility for admin to send a change password mail

- Add possibility for admin to change the role, activation of other user

- Add possibility for admin to delete account

- Add possibility offer or demand for all role exept non membre

- Add possibility for the owner to delete their offer or demand

- Add possibility for admin to delete any offer or demand

- Add categories

- Add economy (to be see in menu)

- Add possibility for to visualise economy on user page for admin

- possibility for admin to change economy (all write need to be saved)

- Add page to view historical transaction for admin

- Add possibility for everyone to select a transaction (need to be confirmed by both party, or 1 admin)

- Add possibility for admin to cancel any transaction

- Add possiblity to post multuples photos

- Add captcha on any form (If 1 captcha is valid, store in session is recapctchaPassed)

- Track ip for failed login and protect login brute force by limiting 10 attempt by 2m

- Track email type, ip, sendtime and add a middleware to protect by time(on types by on account and by ip) email sending

- Add contact form for authenticated personn on contact page

- Rename DOMAIN settings to express domain

- Rename angular, cypress, express by front, back, cypress (rename the package name to)

- Organisate angular structure gerneral dir, component dir, services dir

- Put config file (like typeorm datasource in the root of the project) and the code in src (check if it's the case for some other file)

- Unificate the migrations

- Simplificate read me by reducing size and add statement to adapt .sh by .ps1 depending on the os

- Simplificate news element (set mode for creation, edit, display) and render group rendering

- Use of angular date picker insted of the input of type date now used

- Make a sort that js, html and css are compressed for faster loading slow connexion

- Check to replace the time picker by a better one

- Add photos to news

- Update read me to add github recommendation

- Check to switch docker image to alpine to boost performance

- Add tech stack to the readme

- Change db conn to mysql2 as it's alredy used by typeorm

- Update readme for migrations (see to change :generate by :create)

- Migrate server dedicated server for prod

- Make a sort that when adding a news, insted of reload, it add the news in the list to avoid break other edit news (and less request)