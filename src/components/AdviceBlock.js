import { Component } from "preact";

class AdviceBlock extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <h1
                className="text-xs text-green
                uppercase tracking-[0.2rem] mb-6">Advice #{this.props.adviceId}</h1>
                <p
                className="text-2xl mb-8"><q>{this.props.adviceText}</q></p>
            </>
        )
    }

}

export default AdviceBlock;