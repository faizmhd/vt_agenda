import  React,{Component} from 'react';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            happy : false
        }
    }

    render() {
        return (
            <div>
                <h1>Coucou</h1>
            </div>
        );
    }
}

export default Test;

