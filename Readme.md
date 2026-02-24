1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Answer :- getElementById() selects a single element by its id, getElementsByClassName() selects multiple elements with the same class (as an HTMLCollection), while querySelector() and querySelectorAll() use CSS selectors to return the first matching element or all matching elements (as a NodeList).

2. How do you create and insert a new element into the DOM?

Answer :-  You can create a new element using document.createElement() and then insert it into the DOM using appendChild() or append().

3. What is Event Bubbling? And how does it work?

Answer :-  Event Bubbling is a process where an event starts from the target element and then propagates upward through its parent elements.

4. What is Event Delegation in JavaScript? Why is it useful?

Answer :-  Event Delegation is a technique where an event listener is added to a parent element to manage events for its child elements, which improves performance and works well for dynamically added elements.

5. What is the difference between preventDefault() and stopPropagation() methods?

Answer :-  preventDefault() stops the browser’s default behavior, while stopPropagation() prevents the event from bubbling up to parent elements.
