import React from 'react';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import ResList from "../Components/ResList";

describe("ResList component", () => {
    it("renders list of reses", () => {
        render (<Router><ResList
            reses={[
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
            ]}
        /></Router>);
        expect(screen.getAllByRole("link")).toHaveLength(3);
    });
});