import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../Pages/Login';
import { act } from 'react-dom/test-utils';
import fetchMock from 'jest-fetch-mock';



fetchMock.enableMocks()

const data = {data: "Successful login"}

describe("Login page", ()=> {
    it("renders Login with form", () => {
        render(<Router><Login/></Router>)
        expect(screen.getByRole("form")).toBeInTheDocument()
    })

    it("tests user login", async ()=> {

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act( async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data))
            render(<Router><Login/></Router>)
        })
        const signInButton = screen.getByRole("form")

            // eslint-disable-next-line testing-library/no-node-access
            .querySelector('.sign_button')
        fireEvent.click(signInButton)

        await expect(fetch).toHaveBeenCalledWith("http://localhost:8089/api/v1/user/login",
            {
                method: "POST",
                body: JSON.stringify({'username':'', 'password': ''}),
                headers: {'Content-Type': 'application/json'}})
        await expect(fetch).toHaveBeenCalledTimes(1);
    })

})