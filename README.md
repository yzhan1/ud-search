# ud-search

An **Unofficial** Urban Dictionary search interface built using React.js, Typescript, Redis and Ant Design.
The project serves as a practice on server-side caching and frontend development.

App is live at: https://ud-search.herokuapp.com/

API is available at: https://ud-search.herokuapp.com/api/

## Documentation
Each API call will go through Urban Dictionary's public API server to fetch JSON data.
The JSON data passed back will be cached in Redis and will expire after 24 hours. This 
reduced the respond speed of API endpoints by 60%.

Results passed back from API call will be cached in local browser's `localStorage`. 
`/client/src/utils/Storage.ts` takes care of setting and getting the cache and checking for 
cache validity based on `expires_at` attribute. By default cache will expire after one day.

API call from searching is also debounced using `Timer` to prevent too many unnecessary `GET` 
requests being fired to the server. Searching will actually happen only after user has stopped
typing for 500 ms.

Autocomplete is also available based on Ant Design's `<AutoComplete/>` component. Autocomplete's `dataSource` 
(an array of search history) is saved on `localStorage` as well.

### API Specific

+ `/api/define/:term`
  + Returns a term's tags, list of matched definitions and sound files
+ `/api/define/:defid`
  + Returns a definition with `id` = `defid1`
+ `/api/random`
  + Returns 10 random definitions