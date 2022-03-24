import { Component } from "preact";
import { generateAdvice } from "./advice.js";
import AdviceBlock from "./components/AdviceBlock.js";
import diceIcon from "./images/icon-dice.svg";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { adviceId: "none", adviceText: "" };
    this.changeAdvice = this.changeAdvice.bind(this);
  }

  changeAdvice() {
    generateAdvice().then((data) => {
      this.setState({ adviceId: data.id, adviceText: data.advice });
    });
  }

  componentDidMount() {
    if (typeof(this.state.adviceId) !== 'number' || this.state.adviceId < 221) this.changeAdvice();
  }

  render() {
    
    return (
      <>
        <main
        className="bg-blue-200 text-cyan text-center
         mx-auto w-[90vw] rounded-xl max-w-[480px] relative
         shadow-blue-300 shadow-md
         p-10 flex-[0_0_100%]">
          <AdviceBlock
            adviceId={this.state.adviceId}
            adviceText={this.state.adviceText}
          />
          <div className="bg-divider-mobile w-full h-4 md:bg-divider-desktop bg-no-repeat bg-center mb-6"></div>
          <button
           onClick={this.changeAdvice} className="bg-green p-4 rounded-full absolute -bottom-6 left-0 right-0 m-auto
          hover:shadow-[0_0_20px_hsl(150_100%_66%)] focus:outline-4 focus:outline-[#e6bf42] focus:outline"><img src={diceIcon} alt="dice icon" /><span className="sr-only">Change Advice</span></button>
        </main>
      </>
    );
  }
}

document.body.classList.add("min-h-screen", "bg-blue-300", "font-main", "flex", "items-center", "justify-center", "flex-wrap");
/*
<div class="attribution">
      Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
      Coded by <a href="#">Your Name Here</a>.
    </div> 
*/
export default App;
