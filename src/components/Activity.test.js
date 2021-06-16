import { render, screen } from "@testing-library/react";

import { Activities } from "./Activity";

describe('Activities', () => {
    afterEach(() => global.fetch.mockClear());

    it('loads activities from props.activityTypes[index].url when mounted', () => {
        const activityUrl = "example.com";
        jest.spyOn(global, 'fetch')
            .mockImplementationOnce(() => Promise.resolve({
                status: 200,
                json: () => Promise.resolve([{}, {}])
            }))
        render(<Activities activityTypes={[ {url: activityUrl, label: "Example Activities"} ]}  />);
        expect(global.fetch).toHaveBeenCalledWith(activityUrl);
    });
    it('shows message when there are no activities', () => {
        jest.spyOn(global, 'fetch')
            .mockImplementationOnce(() => Promise.resolve({
                status: 200,
                json: () => Promise.resolve([])
            }))
        const noticeMsg = "Once actions are scheduled, they'll appear here.";
        render(<Activities activityTypes={[ {url: "example.com", label: "Example Activities"} ]}  />);
        expect(screen.getByText(noticeMsg)).toBeTruthy();
    });
})