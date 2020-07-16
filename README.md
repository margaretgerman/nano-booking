Notes to the reviewer

Pls note that even though Formik Persist was added as a last step, it was my executive decision not to proceed with, since it completely changes the logic of data percistance throughout the app. 


Task:
● Make a new Next.js app (read the learn section on next.js website it's very short)
● Install Material UI styles
● Make 3 steps reservation process, each step in a new page.
● Step 1:
  - Checkout time must be bigger than checkin
  - Checkin can be only in the next 2 hours (from current time and not sooner) 
  - The total time of booking must be more than 4 hours
● Step 2:
  - select address from google API places 
● Step 3:
  - Show the summary of reservation: dates, place details and a map of google with the address as MARKER
Requirements:
1. We need to get 100% score in Lighthouse ​https://developers.google.com/web/tools/lighthouse
2. Use Formik for forms in the steps (validation with Yup)
3. Use redux hooks
4. Use ​custom theme ​with material ui
5. Use date-fns
6. After u finish, add “persist” to the form
