async function callApi() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    console.log(res);
}

callApi();