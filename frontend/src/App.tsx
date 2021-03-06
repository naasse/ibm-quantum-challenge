/******************************************************************************\
 * Name: App.tsx
 *
 * Purpose: Start the frontend application.
 *
 * Author: naasse (nate.asselstine@gmail.com)
 \******************************************************************************/

import React, {ReactElement} from "react";
import "./App.css";
import Banner from "./components/banner/Banner";
import Pokedex from "./components/pokedex/Pokedex";

type Props = { "title": string };
type State = {};

export default class App extends React.Component<Props, State> {

    /**
     * Default constructor.
     * @param {Props} props the component properties.
     */
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    /**
     * Render the main view of the application.
     */
    render(): ReactElement {
        return (
            <div className="App">
                <header className="App-header">
                    <Banner title={this.props.title}/>
                </header>
                <Pokedex/>
            </div>
        );
    }
}
