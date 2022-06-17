import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {act} from "react-dom/test-utils";
import fetchMock from "jest-fetch-mock";
import EditReservation from "../Pages/Reservation/EditReservation";

fetchMock.enableMocks()

const data = {data: {
    user_id: '2',
    audience_id: '2',
    title: 'test',
    from_date: '2021-10-22 10:00:00',
    to_date: '2021-10-25 11:00:00',}};


const data2 = {data: {
    user_id: '2',
    audience_id: '2',
    title: 'test22',
    from_date: '2021-10-22 10:00:00',
    to_date: '2021-10-25 11:00:00'}};

describe("Edit reservation page", () => {


    it("updates res", async () => {

        localStorage.setItem("loggedUser", true)


        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data));
            render(<Router><EditReservation /></Router>);
        });
        const editButton = screen.getByTestId("edit_button");
        fireEvent.click(editButton);

        await fetch.mockImplementationOnce(() => Promise.resolve(data2));


        const headers = new Headers();
        headers.set('Authorization', `Basic ${btoa('alex123:12345')}`);
        headers.set('content-type', 'application/json');


        await expect(fetch).toHaveBeenCalledTimes(1);

    });

});