// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';

export const generateRandomNumber = (min: number, max: number): number => Math.random() * (max - min) + min;

export const getAccessTokenFromResponse = (response: request.Response): string =>
    response.headers['set-cookie'][0].trim().split('=')[1].split(';')[0];

export const slugify = (str: string): string => {
    let copy = str.slice();
    copy = copy.replace(/^\s+|\s+$/g, ''); // trim
    copy = copy.toLowerCase();

    // remove accents, swap ñ for n, etc
    const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
    const to = 'aaaaeeeeiiiioooouuuunc------';
    for (let i = 0, l = from.length; i < l; i += 1) {
        copy = copy.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    copy = copy
        .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return copy;
};

export const booleanify = (value: string): boolean => {
    const truthy: string[] = ['true', 'True', '1'];

    return truthy.includes(value);
};
