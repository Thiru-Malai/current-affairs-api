# Current Affairs API
This API provides the Current Affairs of India and International News and daily quizzes for practicing your skills on current affairs.

# Features:
1. Today current affairs
2. Quiz for today
3. Current affair for any day ( dev )


Endpoints:
1. /today
```const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://current-affairs-of-india.p.rapidapi.com/today',
  headers: {
    'X-RapidAPI-Key': '9bff012c16msh5470f9994d044c2p1bd648jsn0748463ea5fd',
    'X-RapidAPI-Host': 'current-affairs-of-india.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
```

2. /today-quiz

```
const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://current-affairs-of-india.p.rapidapi.com/today-quiz',
  headers: {
    'X-RapidAPI-Key': '9bff012c16msh5470f9994d044c2p1bd648jsn0748463ea5fd',
    'X-RapidAPI-Host': 'current-affairs-of-india.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
```
