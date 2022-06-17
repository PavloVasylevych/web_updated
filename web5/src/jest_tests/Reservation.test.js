import React from 'react';
import {render} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {act} from "react-dom/test-utils";
import fetchMock from "jest-fetch-mock";
import Reservation from "../Pages/Reservation/Reservation";

fetchMock.enableMocks()

const data = {
    id:'1',
    user_id: '2',
    audience_id: '2',
    title: 'test',
    from_date: '2021-10-22 10:00:00',
    to_date: '2021-10-25 11:00:00',}

describe("Res get page", () => {


    it('renders the res and shows its data', async () => {

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data));
            render(<Router><Reservation /></Router>);
        });

        const headers = new Headers();
        headers.set('Authorization', `Basic ${btoa('alex123:12345')}`);
        headers.set('content-type', 'application/json');

        await expect(fetch).toHaveBeenCalledWith("http://localhost:8089/api/v1/reservation/1", {
            method: 'GET',
            headers,
        });

        await expect(fetch).toHaveBeenCalledTimes(1);

    });
});