const stack = [];
let top = -1;
let data;

function isFull() {
  if (top == -1) {
    return 1;
  } else {
    return 0;
  }
}

function push(data) {
  top = top + 1;
  stack[top] = data;
  console.log(stack[top]);
  return stack[top];
}

function pop(data) {
  if (stack[top] == data) {
    // top = stack.length;
    console.log(stack);
    let newElement = undefined;
    stack[top] = newElement;
    top = top - 1;
    stack[top];
    return stack;
  } else {
    // console.log(data);
  }
  return stack[top];
}

push("hey");
pop("hey");
console.log(stack);
// console.log(pop());
