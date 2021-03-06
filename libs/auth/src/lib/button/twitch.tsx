import React from 'react';
import { faTwitch, faSpotify } from '@fortawesome/free-brands-svg-icons';
import { SocialButton } from './social-button';

export const AuthButtonTwitch = () => (
  <SocialButton
    className="btn-social-twitch"
    provider="twitch"
    icon={faTwitch}
  />
);
