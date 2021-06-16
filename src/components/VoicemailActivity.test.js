import { render, screen } from "@testing-library/react";

import { VoicemailActivity } from "./Activity";

describe('VoicemailActivity', () => {
    it('shows duration in minutes for voicemail activity', () => {
        const durationSecs = 125;
        const durationMins = "2:05";
        jest.spyOn(global, 'fetch')
            .mockImplementationOnce(() => Promise.resolve({
                status: 200,
                json: () => Promise.resolve([{}, {}])
            }))
            const props = {
                occurred_at: durationSecs, 
                dynamic_data: {
                    voicemail_duration: durationSecs,
                    user_name: 'Agent 007'
                }
            };
        render(<VoicemailActivity {...props} />);
        expect(screen.getByText(durationMins, { exact: false })).toBeTruthy();
    });
})