/******************************************************************************\
 * Name: Banner.tsx
 *
 * Purpose: Provides the application banner component.
 *
 * Author: naasse (nate.asselstine@gmail.com)
 \******************************************************************************/

import React, {ReactElement} from "react";
import "./Banner.css";

type Props = { "title": string } ;
type State = {};

export default class Banner extends React.Component<Props, State> {

    /**
     * Default constructor.
     * @param {Props} props the component properties.
     */
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    /**
     * Render the Banner component.
     */
    render(): ReactElement {
        return (
            <div className="Banner">
                <span className="title">{this.props.title}</span>
            </div>
        );
    }
}
