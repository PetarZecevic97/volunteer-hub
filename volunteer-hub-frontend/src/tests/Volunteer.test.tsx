import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Volunteer from "../pages/Volunteer";
import { MemoryRouter, useParams } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { getVolunteer } from "../actions/volunteerActions";

const mockStore = configureMockStore([]);

describe("Volunteer Component", () => {
  const initialState = {
    profileData: {
      myProfile: {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        skills: ["Skill1", "Skill2"],
      },
    },
    volunteers: {
      volunteer: {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        skills: ["Skill3", "Skill4"],
      },
    },
  };

  it("renders the volunteer profile for the current user", async () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Volunteer />
        </MemoryRouter>
      </Provider>
    );

    // Wait for the component to load
    await waitFor(() => {
      expect(screen.getByText("First name: John")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Last name: Doe")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Skills: Skill1, Skill2")).toBeInTheDocument();
    });
  });

});
