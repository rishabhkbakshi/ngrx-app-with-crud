export interface TIME_ZONE {
    value: number,
    region: string,
    zone: string,
    area: string
};

export const LOCALE: string = 'en-US';

export const timeZones: TIME_ZONE[] = [{
    value: 1,
    region: 'India',
    zone: 'GMT+05:30',
    area: 'Asia/Kolkata'
}, {
    value: 2,
    region: 'New York',
    zone: 'GMT-11:00',
    area: 'Amerika/New_York'
}, {
    value: 3,
    region: 'London',
    zone: 'GMT-08:00',
    area: 'Europe/London'
}];