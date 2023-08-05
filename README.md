# Time Tracker app

This is the app that I quickly coded for one company that I applied to for a job of Senior React developer.

### How to run this project

1. clone this repo with git
2. install dependencies `npm install`
3. run npm with `npm start`
4. open `localhost:3000`

### What is included in this project?

1. Auth components with [Firebase](https://firebase.google.com/?)
2. CRUD for timers with [redux toolkit query](https://redux-toolkit.js.org/rtk-query)
3. Responsivness of the app and UI components with [primerreact](https://primereact.org/)
4. Start/stop timer with [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/setInterval)
5. History page, Dashboard and 404 page with [react router 6](https://reactrouter.com/en/main)
6. Typing with [typescript](https://www.typescriptlang.org/)
7. Global state management with [redux toolkit query](https://redux-toolkit.js.org/)
8. Auth state management with [context](https://react.dev/reference/react/createContext)
9. Reusable logic with [custom react hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
10. Pagination for timers with [paginator](https://primereact.org/treetable/#paginator)
11. CSS utility classes with [primeflex](https://www.primefaces.org/primeflex/)
12. Theming with [themeProvider](https://primereact.org/theming/)
13. [Styled components](https://styled-components.com/) to overwrite styles from prime react when needed.

### What was the hardest part?

The hardest part was injecting up to date data into prime react [table](https://primereact.org/treetable/#basic). I had to rely on redux to get the latest state of the counter. These subcomponents in UI table are oblivious to the state.

### What was the easiest part?

I styled everything in 30 minutes so that was easy. But also CRUD methods with firebase. It is superb how firebase has all these helpers methods that we can just call as hooks.

### What is missing from this project?

1. Filtering is not quite finished, you can filter by any data field, but you can not set start end end date
   - I just did not have time to implement this even though it does not seem so difficult
2. Styling is not pixel perfect, there are many subtle differences between the provided design and the result.
   - Same like with filtering, even though styling is even a lesser challenge. I have done pixel perfect design many times but just did not have time to focus on that now.
3. Toast messages to let the user know when there is an error for example in signing up/logging in

I did not finish any of these because this was a test project. In real life I would need more time and more input from designers.
