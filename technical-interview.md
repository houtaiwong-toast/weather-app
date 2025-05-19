# Weather App Technical Interview

## Overview
This technical interview will assess your ability to identify and solve real-world problems in a React-based weather application. The application displays current weather conditions and forecasts, allows users to search by ZIP code, and supports both metric and imperial units.

## Technical Challenges

### 1. Null Checks and Error Handling
**Task:** Identify and fix issues related to null checks and error handling in the application.

**Key Areas to Focus On:**
- The `Weather` component has a null check after using `weatherData` properties
- The `getRelativeTemp` utility has a bug in its temperature range check
- The `Forecast` component doesn't handle an undefined variable

**Optional Questions**
- The `Header` component's ZIP code validation could be improved, how would you improve it?

**Questions to Consider:**
- How would you improve the error handling in these components?
- What edge cases should be considered?
- How would you implement proper type checking?

### 2. Async Operations and Race Conditions
**Task:** Improve the handling of asynchronous operations and prevent race conditions.

**Key Areas to Focus On:**
- Weather data fetching in `App.js` and `server.js`

**Questions to Consider:**
- How would you handle multiple rapid ZIP code searches?
- What's the best way to implement timeout mechanisms?
- How would you implement retry logic for failed API calls?
- What are some data fetching optimizations you could implement?

### 3. Performance Optimization
**Task:** Identify and fix performance issues in the application.

**Key Areas to Focus On:**
- Image loading and optimization
- `WMO.json` file optimization

**Questions to Consider:**
- How would you optimize the loading of weather icons/images?
- What strategies would you use to reduce layout shifts?
- How would you implement proper caching?
- What loading states would you add to improve user experience?
- What tools would you use to locate nonperformant areas of the app? 

### 4. State Management and Data Flow
**Task:** Improve the application's state management and data flow architecture.

**Questions to Consider:**
- How would you refactor the current prop drilling in the application?
- What state management solution would you implement and why?
- How would you handle state persistence between page refreshes?
- How would you implement optimistic updates for better UX?

### 5. API and Backend Optimization
**Task:** Enhance the backend architecture and API design.

**Questions to Consider:**
- How would you implement proper API rate limiting?
- What strategies would you use to optimize API responses?
- How would you implement a robust error handling middleware?
- What caching strategy would you use on the backend?
- How would you document the API for other developers?

### 6. Advanced Implementation
**Task:** Make the application more robust and production-ready.

**Questions to Consider:**
- How would you implement TypeScript in this application?
- What testing strategy would you use?
- How would you improve accessibility?
- What security measures would you implement?
- If you were to rebuild this app from scratch, what technologies would you choose and why?
- If you had a figma a design given to you, what is your process in interpreting a design?
- What type of code standards would you implement here?

## Getting Started
1. Clone the repository
2. Install dependencies using `yarn install`
3. Start the development server using `yarn develop`
4. Begin with the first challenge and work through them in order

## Notes
- Feel free to use any additional libraries or tools you think would be helpful
- Explain/Document your thought process and decisions
- Consider both immediate fixes and long-term improvements
- Focus on writing clean, maintainable code 