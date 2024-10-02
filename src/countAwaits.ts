export function countAwaits(fn: any) {
    const fnStr = fn.toString(); // Convert the function to a string
    const awaitMatches = fnStr.match(/await\s+/g); // Use a regular expression to find all 'await' keywords
    return awaitMatches ? awaitMatches.length : 0; // Return the count of 'await' matches
}