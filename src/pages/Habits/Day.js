import React from "react";

import HabitsContext from "../../contexts/HabitsContext";

import DayButton from "../../components/DayButton";

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