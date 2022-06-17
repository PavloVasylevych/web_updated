import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {act} from "react-dom/test-utils";
import CreateReservation from "../Pages/Reservation/CreateReservation";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks()

const data = {
    user_id: '2',
    audience_id: '2',
    title: 'test',
    from_date: '2021-10-22 10:00:00',
    to_date: '2021-10-25 11:00:00',
}

describe("Create Reservation page", () => {


    it("renders res and create reservation", async () => {
        localStorage.setItem("loggedUser", true)


        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(JSON.stringify(data)));
            render(<Router><CreateReservation /></Router>);
        });

        const headers = new Headers();
        headers.set('Authorization', `Basic ${btoa('alex123:12345')}`);
        headers.set('content-type', 'application/json');

        const editButton = screen.getByTestId("createResButton");
        fireEvent.click(editButton);

        await expect(fetch).toHaveBeenCalledTimes(1);
    });
});