import React from 'react';
import {render} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {act} from "react-dom/test-utils";
import fetchMock from "jest-fetch-mock";
import ViewAllReservation from "../Pages/Reservation/ViewAllReservation";


fetchMock.enableMocks()


const data = {data: {reses: [
            {
                user_id: '2',
                audience_id: '3',
                title: 'Test1',
                from_date: '2022-05-10 10:10:10',
                to_date: '2022-05-12 10:10:10',
            },
            {
                user_id: '2',
                audience_id: '3',
                title: 'Test1',
                from_date: '2022-06-10 10:10:10',
                to_date: '2022-06-12 10:10:10',
            },
            {
                user_id: '2',
                audience_id: '3',
                title: 'Test1',
                from_date: '2022-07-10 10:10:10',
                to_date: '2022-07-12 10:10:10',
            }
        ]}}

describe("View reservation page", () => {

    localStorage.setItem("loggedUser", true)

    it("renders list of reses and shows info", async () => {
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data));
            render(<Router><ViewAllReservation /></Router>);
        });


        const headers = new Headers();
        headers.set('Authorization', `Basic ${btoa('alex123:12345')}`);
        headers.set('content-type', 'application/json');

        await expect(fetch).toHaveBeenCalledWith("http://localhost:8089/api/v1/reservation/all_username/alex123", {
            method: 'GET',
            headers,
        });

        await expect(fetch).toHaveBeenCalledTimes(1);
    });
});


