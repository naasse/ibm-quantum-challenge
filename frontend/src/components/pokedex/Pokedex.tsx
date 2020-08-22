/******************************************************************************\
 * Name: Pokedex.tsx
 *
 * Purpose: Provides the application Pokedex component.
 *
 * Author: naasse (nate.asselstine@gmail.com)
 \******************************************************************************/

import React, {ReactElement, SyntheticEvent} from "react";
import "./Pokedex.css";
import PokemonApi from "../../api/PokemonApi";
import Table from "../table/Table";
import Pokemon from "../../representations/Pokemon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp} from "@fortawesome/free-solid-svg-icons";
import {isEqual} from "lodash";

type Props = {};
type State = { "count": number, "pokemon": Pokemon[], "offset": number, "canGetPrevious": boolean, "canGetNext": boolean };

export default class Pokedex extends React.Component<Props, State> {

    /**
     * How many Pokemon to request per page.
     */
    private readonly pageSize: number = 10;

    /**
     * Default constructor.
     * @param {Props} props the component properties.
     * @return {Pokedex} the constructed component.
     */
    constructor(props: Props) {
        super(props);
        this.state = {
            "count": 0,
            "pokemon": [],
            "offset": 0,
            "canGetPrevious": false,
            "canGetNext": false
        };
        // Bind the function scopes
        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.toggleFavorite = this.toggleFavorite.bind(this);
    }

    /**
     * Lifecycle method to run after the component completes mounting.
     */
    componentDidMount(): void {
        this.setPokemonCount();
        this.setPokemon();
    }

    /**
     * Lifecycle method to run after component state is updated.
     *
     * @param {Readonly<Props>} prevProps the previous props.
     * @param {Readonly<State>} prevState the previous state.
     */
    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>): void {
        this.setPokemon();
    }

    /**
     * Set the count of Pokemon.
     */
    setPokemonCount(): void {
        PokemonApi.getCount().then((response) => {
            this.setState((prevState, props) => ({
                "count": response
            }));
        }).catch((err) => {
            console.error(err);
        });
    }

    /**
     * Set the Pokemon table data to the first page.
     */
    setPokemon(): void {
        PokemonApi.find(this.pageSize, this.state.offset).then((response) => {
            // Only set state if date changed
            if (!isEqual(response, this.state.pokemon)) {
                this.setState((prevState, props) => ({
                    "pokemon": response,
                    "canGetPrevious": this.state.offset !== 0,
                    "canGetNext": this.state.offset + this.pageSize < this.state.count
                }));
            }
        }).catch((err) => {
            console.error(err);
        });
    }

    /**
     * Decrement the current pagination offset.
     * @param {SyntheticEvent} evt the event fired by the click.
     */
    previousPage(evt: SyntheticEvent): void {
        evt.preventDefault();
        if (this.state.canGetPrevious) {
            this.setState((prevState, props) => ({
                "offset": prevState.offset - this.pageSize
            }));
        }
    }

    /**
     * Increment the current pagination offset.
     * @param {SyntheticEvent} evt the event fired by the click.
     */
    nextPage(evt: SyntheticEvent): void {
        evt.preventDefault();
        if (this.state.canGetNext) {
            this.setState((prevState, props) => ({
                "offset": prevState.offset + this.pageSize
            }));
        }
    }

    /**
     * Toggle the selected Pokemon favorite flag.
     * @param {number} id the ID of the Pokemon to toggle.
     */
    toggleFavorite(id: number): void {
        PokemonApi.toggleFavorite(id).then(() => {
            this.setPokemon();
        }).catch((err) => {
            console.error(err);
        });
    }

    /**
     * Render the Pokedex component.
     * @return {ReactElement} the Pokedex React element.
     */
    render(): ReactElement {
        return (
            <div className="Pokedex">
                <p className="pokemon-count">
                    Total Pokemon: {this.state.count} Pokemon.
                </p>
                <span className="pagination-toolbar">
                    Pagination:
                    <FontAwesomeIcon
                        icon={faArrowUp}
                        onClick={this.previousPage}
                        className={this.state.canGetPrevious ? "" : "disabled-button"}/>
                    <FontAwesomeIcon
                        icon={faArrowDown}
                        onClick={this.nextPage}
                        className={this.state.canGetNext ? "" : "disabled-button"}/>
                </span>
                <Table
                    pokemon={this.state.pokemon}
                    onFavorite={this.toggleFavorite}/>
            </div>
        );
    }
}
