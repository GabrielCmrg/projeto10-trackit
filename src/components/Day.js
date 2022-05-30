import React from "react";
import styled from "styled-components";

import HabitsContext from "../contexts/HabitsContext";

export default function Day({ day, index, isLoading }) {
    const {selectedDays, setSelectedDays } = React.useContext(HabitsContext);
    const [selected, setSelected] = React.useState(selectedDays.includes(index));

    React.useEffect(() => {
        if (selected) {
            setSelectedDays([...selectedDays, index]);
        } else {
            setSelectedDays(selectedDays.filter(weekday => weekday !== index));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    return (
        <DayButton
            type="button"
            color={selected? "white": "#CFCFCF"}
            bgcolor={selected? "#CFCFCF": "white"}
            onClick={() => setSelected(!selected)}
            disabled={isLoading}
        >
            {day[0].toUpperCase()}
        </DayButton>
    );
}

const DayButton = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #CFCFCF;
    font-size: 20px;
    color: ${props => props.color};
    background-color: ${props => props.bgcolor};
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3px;
    cursor: pointer;
`;

export { DayButton };