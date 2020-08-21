/******************************************************************************\
 * Name: Pokedex.tsx
 *
 * Purpose: Provides the application Pokedex component.
 *
 * Author: naasse (nate.asselstine@gmail.com)
 \******************************************************************************/

import React, {ReactElement} from "react";
import "./Pokedex.css";
import PokemonApi from "../../api/PokemonApi";

type Props = {};
type State = { "pokemonCount": number };

export default class Pokedex extends React.Component<Props, State> {

    /**
     * Default constructor.
     * @param {Props} props the component properties.
     */
    constructor(props: Props) {
        super(props);
        this.state = {
            "pokemonCount": 0
        };
    }

    /**
     * Lifecycle method to run after the component completes mounting.
     */
    componentDidMount(): void {
        this.getPokemonCount();
    }

    /**
     * Get the count of Pokemon.
     */
    getPokemonCount(): void {
        PokemonApi.getCount().then((response) => {
            console.log(response);
            this.setState({"pokemonCount": response});
        }).catch((err) => {
            console.error(err);
        });
    }

    /**
     * Render the Pokedex component.
     */
    render(): ReactElement {
        return (
            <div className="Pokedex">
                Pokedex goes here!
                <br/>
                There are currently {this.state.pokemonCount} Pokemon.
            </div>
        );
    }
}
