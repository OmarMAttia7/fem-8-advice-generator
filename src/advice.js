export async function generateAdvice() {

    let randomId = Math.floor( Math.random() * 240 );
  let requestData = await fetch(`https://api.adviceslip.com/advice/${randomId}`, {method: "GET"});
    
  let adviceData = await requestData.json();
  return adviceData.slip;
}
