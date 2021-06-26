# ITRex-task-2

Write an algorithm for finding a way out of the maze. The maze is a 2-dimensional array in which:

`0` - start position
`+` - way
`#` - wall
The solution should be an array of strings with a sequence of necessary actions to exit the maze.

Example of input data:
```
[
  ['#','#','#','#','#','#','#','#','#'],
  ['#','+','+','+','#','+','+','+','#'],
  ['#','+','#','+','#','+','#','+','#'],
  ['+','+','#','+','0','+','#','+','#'],
  ['#','#','#','+','#','#','#','#','#'],
  ['#','#','+','+','#','#','#','#','#'],
  ['#','#','+','#','#','#','#','#','#'],
  ['#','#','#','#','#','#','#','#','#'],
]
```

Example of answer: 

```['left', 'top','top','left','left','bottom','bottom','left']```