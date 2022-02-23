// Token.js

const setCookie = (name, value, exp = 5) => {
	let date = new Date();
	date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
	document.cookie = `${name}=${value}; expires=${date.toUTCString()}`;
  };
  
  // const getToken = () => {
  //   const token = window.localStorage.getItem("token");
  //   const realToken = token.replace(/\"/gi, "");
  //   //   console.log("토큰값", realToken);
  //   return realToken;
  // };
  
  export { setCookie };

// // Token.js

// const getToken = () => {
// 	const token = window.localStorage.getItem('token');
// 	const realToken = token.replace(/\"/gi, '');
// 	//   console.log("토큰값", realToken);
// 	return realToken;
// };

// export default getToken;