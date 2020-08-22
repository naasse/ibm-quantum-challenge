/******************************************************************************\
 * Name: Table.tsx
 *
 * Purpose: Provides the application table component.
 *
 * Author: naasse (nate.asselstine@gmail.com)
 \******************************************************************************/

import React, {ReactElement} from "react";
import "./Table.css";
import Pokemon from "../../representations/Pokemon";
import "bootstrap/dist/css/bootstrap.min.css";
import {isNil} from "lodash";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";

type Props = { "pokemon": Pokemon[], "onFavorite": (id: number) => void };
type State = {};

export default class Table extends React.Component<Props, State> {

    /**
     * Default constructor.
     * @param {Props} props the component properties.
     * @return {Table} the constructed component.
     */
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    /**
     * Get the table header.
     * @return {ReactElement} the table header element.
     */
    getTableHeader(): ReactElement {
        return <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Classification</th>
            <th>Types</th>
            <th>Favorite</th>
        </tr>;
    }

    /**
     * Get the table body.
     * @return {ReactElement[]} the array of rows elements.
     */
    getTableBody(): ReactElement[] {
        return this.props.pokemon.map((p) => {
            return (
                <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>{p.classification}</td>
                    <td>
                        {
                            !isNil(p.types) && <ul>
                                {p.types.map((t, index) => {
                                    return (<li key={index}>{t}</li>);
                                })}
                            </ul>
                        }
                    </td>
                    <td>
                        <FontAwesomeIcon
                            icon={faStar}
                            onClick={this.props.onFavorite.bind(this, p.id)}
                            className={p.favorite ? "favorite" : "not-favorite"}/>
                    </td>
                </tr>
            );
        });
    }

    /**
     * Render the Table component.
     * @return {ReactElement} the Table React element.
     */
    render(): ReactElement {
        return (
            <div className="Table">
                <table className="table">
                    <thead>{this.getTableHeader()}</thead>
                    <tbody>{this.getTableBody()}</tbody>
                </table>
            </div>
        );
    }
}
