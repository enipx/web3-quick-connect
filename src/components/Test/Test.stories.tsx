import { Button } from '@oreo-ui/web';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { useConnect } from '../provider';

const StoryConnect = (arg: any) => {
  const { connect } = useConnect();

  return <Button onClick={connect} text="Connect" {...arg} />;
};

export default {
  title: 'Components/Test',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <StoryConnect {...args} />
);

export const Default = Template.bind({});
Default.args = {
  text: 'Connect',
};
