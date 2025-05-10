let stack = [];
let top = -1;

function pushData(data) {
  top = top + 1;
  stack[top] = data;
  return data;
}

function popData(data) {
  console.log(stack.length);
  if (top == -1) {
    console.log("no elements");
    // return null;
  } else {
    if (stack.length > -1) {
      //   let newStack = [];
      //   data = stack[top];
      //   let newTop = top;
      top = top - 1;
      //   newStack = stack;
      console.log(top);
      return stack[top];
      //   return newStack[newTop];
      //   let x = stack[top - 1];

      //   stack[top] = stack[top - 1];
      //   top = top - 1;
      //   return stack[top];
    } else {
      return stack[top];
    }
    // top = top -1
  }
  console.log(stack[top]);
}

function returnStack(data) {
  console.log(stack);
  //     for (let i = 0; i < stack.length; i++) {
  // }
}
pushData(3);
pushData(1);
pushData(4);
popData(4);
returnStack(stack);
// console.log(stack);
