import { FunctionComponent } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "./datepicker.css";
import it from "date-fns/locale/it";

export interface DatePickerProps {
    field: any;
    form: any;
}

registerLocale("it", it);

const DatePickerComponent: FunctionComponent<DatePickerProps> = ({
    field,
    form,
}) => {
    return (
        <DatePicker
            selected={(field.value && new Date(field.value)) || null}
            onChange={(date) => form.setFieldValue(field.name, date)}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            calendarStartDay={1}
            locale={"it"}
            dateFormat={"dd/MM/yyyy"}
        />
    );
};

export default DatePickerComponent;