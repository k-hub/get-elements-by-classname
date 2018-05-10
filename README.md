# get-elements-by-classname

After reviewing element object properties and methods as well as BFS and DFS, I came up with this solution. I believe the runtime is O(n^2) because I have a nested for loop inside a while loop. 

I decided to use BFS approach because I noticed that the element object has a children property as shown in line 12. This will give me all the children of a node. 
(line 12: let childElement = currentElement.children[index];) 
BFS traverses the tree by levels.

Example tree:

root: html

two children: head, body

head has three children: meta, link, link 

body has three childre: div, div, div
               
Order of traversal: html, head, body, meta, link, link, div, div, div

I stored each node in my implentation of a queue. I initialize the queue with the first node, in this case, HTML node. Then I have a while loop with the stop condition that depends on the queue length. Once the queue is empty, we have traversed the entire tree. Using the queue, I access the first node in the queue and check for its children and append each child to the queue. 

Before I officially dequeue the first item in the queue, I check to see if the element's className matches the input className as shown in line 18. 
(line 18: if (elementToDequeue.className.toString().indexOf(className) !== -1) { ... } )
I would have used the ES6 method of includes() to check for the className instead of indexOf() if that was an option. 

Finally I dequeue the first item in the queue by reassigning and slicing my queue to only include items from index 1 to the end of the queue.
