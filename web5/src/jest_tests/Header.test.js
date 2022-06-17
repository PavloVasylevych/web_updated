import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import Header from "../Components/Header";
import { act } from 'react-dom/test-utils';

describe("Header page test", ()=> {
    it("renders Header", async ()=> {

        await act(async () => {
            render(<Router><Header/></Router>);
        });
        expect(screen.getAllByRole('link')).toHaveLength(6);
    })

    it("User Logout", async () => {


        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            render(<Router><Header/></Router>);
        });
        const logoutLink = screen.getByText("Logout");
        fireEvent.click(logoutLink);
    });

})