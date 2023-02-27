/* eslint-disable no-else-return */
/* eslint-disable no-shadow */
import { ChangeEvent, useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import 'dayjs/locale/ro';
import isToday from 'dayjs/plugin/isToday';

import useTranslations from '../../hooks/useTranslations';
import Select from '../Form/Select';
import { IOrder } from '../../types/order';

dayjs.extend(calendar);
dayjs.extend(isToday);
dayjs().format();
dayjs.locale('ro');

const generateTimes = (date: Dayjs): Dayjs[] => {
    const currentDate = dayjs();

    const arr: Dayjs[] = [];

    const year: number = currentDate.year();
    const month: number = currentDate.month() + 1;
    const day: number = currentDate.date();

    const lowerBound: Dayjs = dayjs(`${year}-${month}-${day} 9:30`);
    const upperBound: Dayjs = dayjs(`${year}-${month}-${day} 22:00`);

    if (date.isToday()) {
        let tmpDate = dayjs();

        if (date.hour() >= 22 && date.minute() >= 0) {
            tmpDate = lowerBound.add(1, 'day');
            while (tmpDate < upperBound.add(1, 'day')) {
                // https://stackoverflow.com/questions/25323823/round-moment-js-object-time-to-nearest-30-minute-interval
                tmpDate = tmpDate.add(15, 'minutes');

                const remainder: number = 15 - (tmpDate.minute() % 15);
                const dateTime: Dayjs = dayjs(tmpDate).add(remainder, 'minutes');

                if (dateTime.hour() >= 22 && dateTime.minute() > upperBound.minute()) {
                    // if calculated time > 22:00 - break generation
                    break;
                }

                arr.push(dateTime);
            }
            return arr;
        }
        if (date.hour() < 10) {
            let tmpDate = lowerBound;

            while (tmpDate < upperBound) {
                // https://stackoverflow.com/questions/25323823/round-moment-js-object-time-to-nearest-30-minute-interval
                tmpDate = tmpDate.add(15, 'minutes');

                const remainder: number = 15 - (tmpDate.minute() % 15);
                const dateTime: Dayjs = dayjs(tmpDate).add(remainder, 'minutes');

                if (dateTime.hour() >= 22 && dateTime.minute() > upperBound.minute()) {
                    // if calculated time > 22:00 - break generation
                    break;
                }

                arr.push(dateTime);
            }
            return arr;
        } else {
            let tmpDate = dayjs();

            while (tmpDate < upperBound) {
                // https://stackoverflow.com/questions/25323823/round-moment-js-object-time-to-nearest-30-minute-interval
                tmpDate = tmpDate.add(15, 'minutes');

                const remainder: number = 15 - (tmpDate.minute() % 15);
                const dateTime: Dayjs = dayjs(tmpDate).add(remainder, 'minutes');

                if (dateTime.hour() >= 22 && dateTime.minute() > upperBound.minute()) {
                    break;
                }

                arr.push(dateTime);
            }

            return arr;
        }
    } else {
        let tmpDate = lowerBound;

        while (tmpDate < upperBound) {
            // https://stackoverflow.com/questions/25323823/round-moment-js-object-time-to-nearest-30-minute-interval
            tmpDate = tmpDate.add(15, 'minutes');

            const remainder: number = 15 - (tmpDate.minute() % 15);
            const dateTime: Dayjs = dayjs(tmpDate).add(remainder, 'minutes');

            if (dateTime.hour() >= 22 && dateTime.minute() > upperBound.minute()) {
                // if calculated time > 22:00 - break generation
                break;
            }

            arr.push(dateTime);
        }
        return arr;
    }
};

const generateDays = (isLate: boolean): Dayjs[] => {
    if (isLate) return Array.from({ length: 7 }, (x, i) => dayjs(dayjs().add(1, 'day')).add(i, 'day'));

    return Array.from({ length: 8 }, (x, i) => dayjs(new Date()).add(i, 'day'));
};

interface IPickDeliveryTimeProps {
    formValues: IOrder;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, object: any, type?: string) => void;
}

const PickDeliveryTime = ({ formValues, handleChange }: IPickDeliveryTimeProps) => {
    const isLate: boolean = dayjs().hour() >= 22 && dayjs().minute() >= 0;
    // const isLate = true;
    const [days, setDays] = useState<Dayjs[]>(generateDays(isLate));
    const [times, setTimes] = useState<Dayjs[]>(generateTimes(days[0]));

    const [day, setDay] = useState<string>(days[0].toISOString());
    const [time, setTime] = useState<Dayjs>(times[0]);

    const t = useTranslations();

    useEffect(() => {
        setDay(dayjs(day).hour(time.hour()).minute(time.minute()).toISOString());
        // console.log(dayjs(day).format('YYYY-MM-DD HH:mm'));
    }, [time]);

    useEffect(() => {
        setTime(times[0]);
        setDay(dayjs(day).hour(time.hour()).minute(time.minute()).toISOString());
    }, [day]);

    return (
        <div className="mb-1">
            {/* <div className="w-1/2">
                <Select
                    name="deliveryDay"
                    options={[...days].slice(1)}
                    defaultValue={days[0]}
                    valueFormatFunction={(item) => item.toISOString()}
                    displayFormatFunction={(item) => item.format('D MMMM')}
                    firstOptionDisplayFormatFunction={isLate ? (item) => t.tomorrow : (item) => t.today}
                    onChange={(e) => {
                        setDay(dayjs(e.target.value).toISOString());
                        setTimes(generateTimes(dayjs(e.target.value)));
                        handleChange(e, formValues, 'delivery-day');
                    }}
                />
            </div> */}

            {/* <div className="w-1/2">
                <Select
                    name="deliveryTime"
                    options={[...times].slice(1)}
                    defaultValue={times[0]}
                    valueFormatFunction={(item) => item.toISOString()}
                    displayFormatFunction={(item) => item.format('H:mm')}
                    onChange={(e) => {
                        setTime(dayjs(e.target.value));
                        handleChange(e, formValues, 'delivery-time');
                    }}
                />
            </div> */}

            <div className="w-1/2 mb-2">
                <select
                    name="deliveryTime"
                    className="bg-white w-full rounded-lg pl-2 py-2 border-2 border-neutral-400 text-sm md:text-md focus:border-vp_brown-100"
                    onChange={(e) => {
                        handleChange(e, formValues, 'delivery-day');
                    }}
                    value={formValues.deliveryTime ? dayjs(formValues.deliveryTime).toISOString() : 'DEFAULT'}
                >
                    <option value="DEFAULT" disabled>
                        Alegeți ziua
                    </option>
                    {days.map((day, index) => (
                        <option value={dayjs(day).toISOString()} key={index}>
                            {day.format('D MMMM')}
                        </option>
                    ))}
                </select>
            </div>

            <div className="w-1/2">
                <select
                    name="deliveryTime"
                    className="bg-white w-full rounded-lg pl-2 py-2 border-2 border-neutral-400 text-sm md:text-md focus:border-vp_brown-100"
                    onChange={(e) => {
                        handleChange(e, formValues, 'delivery-time');
                    }}
                    value={formValues.deliveryTime ? dayjs(formValues.deliveryTime).unix() : 'DEFAULT'}
                >
                    <option value="DEFAULT" disabled>
                        Alegeți timpul
                    </option>
                    {times.map((time, index) => (
                        <option value={dayjs(time).unix()} key={index}>
                            {time.format('H:mm')}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default PickDeliveryTime;
