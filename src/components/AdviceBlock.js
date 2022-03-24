import { Component } from "preact";

class AdviceBlock extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <p
                className="text-xs text-green
                uppercase tracking-[0.2rem] mb-6">Advice #{this.props.adviceId}</p>
                <p
                className="text-xl mb-8"><q>{this.props.adviceText}</q></p>
            </>
        )
    }

}

export default AdviceBlock;