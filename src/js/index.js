import "@scss/style.scss";

const init = async () => {
  console.log("this is a main js file");
  await asyncFn();
};

async function asyncFn() {
  console.log("I'm async function");
}
init();
