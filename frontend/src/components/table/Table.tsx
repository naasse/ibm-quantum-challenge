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

type Props = { "pokemon": Pokemon[] };
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
        </tr>
    }

    /**
     * Get the table body.
     * @return {ReactElement[]} the array of rows elements.
     */
    getTableBody(): ReactElement[] {
        return this.props.pokemon.map((p, index) => {
            return (
                <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                </tr>
            )
        })
    }

    /**
     * Render the Table component.
     * @return {ReactElement} the Table React element.
     */
    render(): ReactElement {
        return (
            <div className="Table">
                <table>
                    <thead>{this.getTableHeader()}</thead>
                    <tbody>{this.getTableBody()}</tbody>

                </table>
            </div>
        );
    }
}
