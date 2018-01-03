# ud-search

An *** (Unofficial) *** Urban Dictionary search interface built using React.js, Typescript, Redis and Ant Design.
The project serves as a practice on server-side caching and frontend development.

API is available at: https://ud-search.herokuapp.com/api/

## API Documentation:
Each API call will go through Urban Dictionary's public API server to fetch JSON data.
The JSON data passed back will be cached in Redis and will expire after 24 hours. This 
reduced the respond speed of API endpoints by 60%.

Results passed back from API call will be cached in local browser's `localStorage`. 
`/client/src/utils/Storage.ts` takes care of setting and getting the cache and checking for 
cache validity based on `expires_at` attribute. By default cache will expire after one day.

+ `/api/define/:term`
+ `/api/define/:defid`
+ `/api/random`

## TODOS
+ AJAX Search on frontend
+ Autocomplete on search